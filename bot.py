import pandas as pd
from datetime import datetime, timedelta
import random  # Para simular precios, puedes reemplazar esto con datos reales

# Clase para manejar el bot de trading
class TradingBot:
    def __init__(self, initial_balance=10000):
        self.balance = initial_balance
        self.open_trades = []
        self.trade_history = []
        self.csv_file = "trade_history.csv"

    def get_fibonacci_levels(self, low, high):
        diff = high - low
        return {
            '0': low,
            '0.5': low + diff * 0.5,
            '0.618': low + diff * 0.618,
            '0.72': low + diff * 0.72,
            '0.75': low + diff * 0.75,
            '1': high
        }

    def calculate_score(self, price, trend_4h, data_2w, data_1w, data_4d, rsi, macd):
        score = 0
        fibo_checks = [
            (data_2w, "2 weeks"),
            (data_1w, "1 week"),
            (data_4d, "4 days")
        ]

        # Verificar niveles de Fibonacci
        for data, timeframe in fibo_checks:
            low, high = data['low'], data['high']
            fibo = self.get_fibonacci_levels(low, high)
            if timeframe == "2 weeks" and fibo['0.5'] <= price <= fibo['0.618']:
                score += 1
            elif timeframe == "1 week" and fibo['0.618'] <= price <= fibo['0.75']:
                score += 1
            elif timeframe == "4 days" and fibo['0.72'] <= price <= fibo['0.75']:
                score += 1

        # Divergencias y sobrecompra/sobreventa
        if rsi['divergence']:
            score += 1
        if macd['divergence']:
            score += 1
        if rsi['overbought'] and rsi['value'] < 15:
            score += 2
        elif rsi['oversold'] and rsi['value'] > 75:
            score += 2
        elif rsi['overbought'] or rsi['oversold']:
            score += 1

        return score

    def place_trade(self, price, trend_4h, data_2w, data_1w, data_4d, rsi, macd):
        score = self.calculate_score(price, trend_4h, data_2w, data_1w, data_4d, rsi, macd)
        if score < 4:
            return

        # Determinar dirección según tendencia 4H
        is_buy = trend_4h == "up"

        # Calcular SL y TP según temporalidad más cercana
        for data, timeframe in [(data_4d, "4 days"), (data_1w, "1 week"), (data_2w, "2 weeks")]:
            fibo = self.get_fibonacci_levels(data['low'], data['high'])
            if (timeframe == "4 days" and fibo['0.72'] <= price <= fibo['0.75']) or \
               (timeframe == "1 week" and fibo['0.618'] <= price <= fibo['0.75']) or \
               (timeframe == "2 weeks" and fibo['0.5'] <= price <= fibo['0.618']):
                sl_fibo = self.get_fibonacci_levels(data_1w['low'], data_1w['high'])['1'] if timeframe != "2 weeks" else fibo['1']
                tp_fibo = self.get_fibonacci_levels(data['high'], data['low']) if is_buy else self.get_fibonacci_levels(data['low'], data['high'])
                break

        # Calcular monto según score y balance disponible
        capital_percentage = min(0.1 * score, 0.5)  # Hasta 50% del balance
        amount = self.balance * capital_percentage

        trade = {
            'entry_price': price,
            'amount': amount,
            'is_buy': is_buy,
            'sl': sl_fibo,
            'tp_50': tp_fibo['0.5'],
            'tp_75': tp_fibo['0.75'],
            'open_time': datetime.now(),
            'score': score,
            'reason': f"Score: {score}, Trend: {trend_4h}"
        }
        self.open_trades.append(trade)
        self.balance -= amount if is_buy else 0  # Solo resta en compras spot
        print(f"Opened trade: {'Buy' if is_buy else 'Sell'} at {price}, Amount: {amount}, SL: {sl_fibo}")

    def update_trades(self, current_price):
        closed_trades = []
        for trade in self.open_trades[:]:
            if (trade['is_buy'] and current_price >= trade['tp_50']) or (not trade['is_buy'] and current_price <= trade['tp_50']):
                # Cerrar 50% en TP 0.5
                profit = (current_price - trade['entry_price']) * trade['amount'] * 0.5 if trade['is_buy'] else (trade['entry_price'] - current_price) * trade['amount'] * 0.5
                self.balance += profit + (trade['amount'] * 0.5 if trade['is_buy'] else 0)
                trade['amount'] *= 0.5

            if (trade['is_buy'] and current_price >= trade['tp_75']) or (not trade['is_buy'] and current_price <= trade['tp_75']):
                # Cerrar 25% en TP 0.75
                profit = (current_price - trade['entry_price']) * trade['amount'] * 0.25 if trade['is_buy'] else (trade['entry_price'] - current_price) * trade['amount'] * 0.25
                self.balance += profit + (trade['amount'] * 0.25 if trade['is_buy'] else 0)
                trade['amount'] *= 0.75

            if (trade['is_buy'] and current_price <= trade['sl']) or (not trade['is_buy'] and current_price >= trade['sl']):
                # Cerrar en SL
                profit = (current_price - trade['entry_price']) * trade['amount'] if trade['is_buy'] else (trade['entry_price'] - current_price) * trade['amount']
                self.balance += profit + (trade['amount'] if trade['is_buy'] else 0)
                closed_trades.append(trade)
                self.open_trades.remove(trade)
                self.log_trade(trade, current_price, profit, "SL")

            elif trade['amount'] == 0 or (trade['is_buy'] and current_price == trade['entry_price']) or (not trade['is_buy'] and current_price == trade['entry_price']):
                # Cerrar en breakeven o TP completo
                self.balance += trade['amount'] if trade['is_buy'] else 0
                closed_trades.append(trade)
                self.open_trades.remove(trade)
                self.log_trade(trade, current_price, 0, "Breakeven/TP")

    def log_trade(self, trade, close_price, profit, status):
        trade_record = {
            'open_time': trade['open_time'],
            'close_time': datetime.now(),
            'entry_price': trade['entry_price'],
            'close_price': close_price,
            'amount': trade['amount'],
            'sl': trade['sl'],
            'tp_50': trade['tp_50'],
            'tp_75': trade['tp_75'],
            'profit': profit,
            'is_winner': profit > 0,
            'reason': trade['reason']
        }
        self.trade_history.append(trade_record)
        self.save_to_csv()

    def save_to_csv(self):
        df = pd.DataFrame(self.trade_history)
        df.to_csv(self.csv_file, index=False)

# Simulación de datos y ejecución
def simulate_bot():
    bot = TradingBot()
    current_date = datetime.now()

    # Datos simulados (puedes conectar a una API real)
    data_2w = {'low': 100, 'high': 150}
    data_1w = {'low': 110, 'high': 145}
    data_4d = {'low': 120, 'high': 140}
    rsi = {'value': 70, 'divergence': True, 'overbought': True, 'oversold': False}
    macd = {'divergence': False}

    while(True):  # Simular 10 ticks
        price = random.uniform(100, 150)  # Precio aleatorio
        trend_4h = random.choice(["up", "down"])
        bot.place_trade(price, trend_4h, data_2w, data_1w, data_4d, rsi, macd)
        bot.update_trades(price)
        print(f"Balance: {bot.balance}")

if __name__ == "__main__":
    simulate_bot()