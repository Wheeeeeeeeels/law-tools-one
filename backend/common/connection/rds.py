import sqlite3

def get_sqlite3_db():
    conn = sqlite3.connect('users.db')
    try:
        yield conn
    except:
        conn.close()