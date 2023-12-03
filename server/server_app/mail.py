from email.message import EmailMessage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import ssl
import smtplib
from config import EMAIL_NAME, EMAIL_PASSWORD


def send_report(user, subject_report, body_report):
    subject = "[ĐƠN LIÊN HỆ TỪ NGƯỜI DÙNG {}] - {}".format(user.username, subject_report)
    
    body_html = """
    <html>
    <head></head>
    <body>
        <h1 class="text-align: center; margin-bottom: 5px">Infinithree System</h1>
        <p><b><i>Chào quản trị viên, </i></b><p>
        
        <p>Đây là một đơn liên hệ mới đến từ người dùng <b>{} ({})</b></p>
        <p>Nội dung đơn liên hệ như sau:</p>
        
        
        <div class="padding: 10px">
            <div style="background: #E8E8E8; border-radius: 10px; padding: 10px">
                {}
            </div>
        </div>
        
        <br>
        
        <hr></hr>
        
        <br>
        <p><b>Thông tin liên hệ:</b></p>
        <p>Họ tên người dùng: {}</p>
        <p>Tên người dùng: {}</p>
        <p>Email người dùng: {}</p>
    </body>
    </html>
    """.format(user.name, user.username, body_report, user.name, user.username, user.email)
    
    send("nganbaoy@gmail.com", body_html, subject)
    
    

def send(email_receiver, body, subject):
    em = EmailMessage()
    em['From'] = EMAIL_NAME
    em['To'] = email_receiver
    em['Subject'] = subject
    em.add_header('Content-Type', 'text/html')
    em.set_payload(body)
    
    

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(EMAIL_NAME, EMAIL_PASSWORD)
        smtp.sendmail(EMAIL_NAME, email_receiver, em.as_string().encode('utf-8'))
