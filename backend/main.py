from fastapi import FastAPI,HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from PIL import Image
from fastapi import WebSocket
import asyncio


from common.connection.rds import get_sqlite3_db
from web.server.vo.user_vo import UserRegister
# from test_mock.mock_data import return_site_data
from loguru import logger
from typing import List
import sqlite3
import secrets
import os
import shutil
import time
from zipfile import ZipFile


app = FastAPI()
security = HTTPBasic()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOT_DIR = os.path.join(BASE_DIR, "screenshots")
# TODO: 检测chrome版本，自动下载CHROME_DRIVER
CHROMEDRIVER_PATH = "/Users/aigc/Downloads/spider/chromedriver-mac-x64/chromedriver"


origins = [
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/")
def read_root():
    return {"key1": "Welcome", "key2": "欢迎使用law-one工具"}

@app.get("/queryInfo", response_model=List[dict])
def query_db(site: str):
    sites = [
        {"name": "http://www.npc.gov.cn/zgrdw/npc/xinwen/2019-05/07/content_2086831.htm","id":0},
        {"name": "https://www.gov.cn/xinwen/2020-06/01/content_5516649.htm", "id": 1},
        {"name": "www.douban.com","id":2},
        {"name": "www.zhihu.com","id":3},
        {"name": "www.github.com","id":4},
        {"name": "www.lawone.com","id":5},
        {"name": "www.test1.com","id":6},
        {"name": "www.test7.com","id":7},
        {"name": "www.test8.com","id":8},
        {"name": "www.test9.com","id":9},
        {"name": "www.test10.com","id":10},
        {"name": "www.test11.com","id":11},
        {"name": "www.test12.com","id":12},
        {"name": "www.law1.com","id":13},
        {"name": "www.law1.com","id":14},
        {"name": "www.law1.com","id":15},
        {"name": "www.law1.com","id":16},
        {"name": "www.law1.com","id":17},
        {"name": "www.law1.com","id":18},
        {"name": "www.law1.com","id":19},
        {"name": "www.law1.com","id":20},
        {"name": "www.law1.com","id":21},
        {"name": "www.law1.com","id":22},
        {"name": "www.law1.com","id":23},
        {"name": "www.law1.com","id":24},
        {"name": "www.law1.com","id":25},
        {"name": "www.law1.com","id":26},
        {"name": "www.law1.com","id":27},
        {"name": "www.law1.com","id":28},
        {"name": "www.law1.com","id":29},
        {"name": "www.law1.com","id":30},
        {"name": "www.law1.com","id":31},
        {"name": "www.law1.com","id":32},
        {"name": "www.law1.com","id":33}
    ]
    
    result = [s for s in sites if site.lower() in s["name"].lower()]
    return result


@app.on_event("startup")
def startup_event():
    with sqlite3.connect('users.db') as conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        """)
        

@app.post("/register")
def register(user:UserRegister,db:sqlite3.Connection=Depends(get_sqlite3_db)):
    email = user.email
    password = user.password
    cursor = db.cursor()
    print(f"email - {email} password - {password}")
    try:
        cursor.execute("insert into users (email,password) values (?,?)",(email,password))
        db.commit()
        logger.info(f"ai - register success.")
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")


@app.post("/login")
def login(credentials: HTTPBasicCredentials = Depends(security), db: sqlite3.Connection = Depends(get_sqlite3_db)):
    cursor = db.cursor()
    logger.info(f"credentials.username - {credentials.username} credentials.password - {credentials.password}")
    logger.info(f"begin login ...")
    user = cursor.execute("SELECT email FROM users WHERE email=? AND password=?", (credentials.username, credentials.password)).fetchone()
    if user:
        # 管理员 -> 后台管理系统
        # return {"status": "ok", "message": "Login successful","role":"admin"}
        return {"status": "ok", "message": "Login successful","role":"user"}
    
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")


# 增加全局进度存储
progress_for_task_id = {}

# WebSocket进度通知
@app.websocket("/ws/screenshot_progress/{task_id}")
async def screenshot_progress(websocket: WebSocket, task_id: str):
    await websocket.accept()
    while True:
        progress = progress_for_task_id.get(task_id, 0)
        await websocket.send_text(f"{progress}%")
        logger.info(f"websocket - {progress}")
        await asyncio.sleep(1)
        if progress >= 100:  # 一旦进度达到100%，关闭WebSocket
            break
    await websocket.close()




@app.get("/spider_and_take_screen_shots")
async def spider_and_take_screen_shots(site_name: str,task_id:str):
    # test_url = "http://www.npc.gov.cn/zgrdw/npc/xinwen/2019-05/07/content_2086831.htm"
    progress_for_task_id[task_id] = 0
    test_url = site_name
    if not os.path.exists(SCREENSHOT_DIR):
        os.makedirs(SCREENSHOT_DIR)
    chrome_driver_service = Service(CHROMEDRIVER_PATH)
    with webdriver.Chrome(service=chrome_driver_service) as driver:
        logger.info(f"zaka --> spider the url --> {test_url}")
        driver.get(test_url)
        # 获取页面长度
        total_height = driver.execute_script("return document.body.scrollHeight")
        num_iterations = (total_height // 900) + 1
        progress_increment = 100.0 / num_iterations
        # 存储图片
        images = []
        # 默认以900像素来进行截图
        for _ in range(0, total_height, 900):          
            driver.execute_script("window.scrollTo(0, arguments[0]);", _)
            progress_for_task_id[task_id] += progress_increment
            logger.info(f"task_id - {task_id} 进度 - {progress_for_task_id[task_id]}")
            time.sleep(2)  
            file_name = f"{SCREENSHOT_DIR}/part_{_}.png"
            driver.save_screenshot(file_name)
            images.append(Image.open(file_name))  

        if not images:
                logger.error("No images were captured!")
                return {"message": "No screenshots were taken!"}
        stitched_image = Image.new('RGB', (images[0].size[0], total_height))
        y_offset = 0
        for image in images:
            stitched_image.paste(image, (0, y_offset))
            y_offset += image.size[1]
            image.close()
        stitched_image.save(os.path.join(SCREENSHOT_DIR, "screenshot.png"))
        for _ in range(0, total_height, 900):
            file_name = f"{SCREENSHOT_DIR}/part_{_}.png"
            os.remove(file_name)
    logger.info(f"zaka --> spider the url --> {test_url} --> success")
    logger.info(f"zaka --> ready --> zip the file")
    shutil.make_archive(os.path.join(BASE_DIR, "screenshots"), 'zip', SCREENSHOT_DIR)
    progress_for_task_id[task_id] = 100
    return {"message": "Screenshot taken and zipped!"}
