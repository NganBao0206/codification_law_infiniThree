# Sử dụng một hình ảnh cơ sở Python sẽ chứa Flask
FROM python:3.9-slim

# Đặt thư mục làm thư mục làm việc cho ứng dụng
WORKDIR /server

# Sao chép tệp requirements.txt vào thư mục làm việc
COPY requirements.txt .

# Cài đặt các gói phụ thuộc từ requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 5000 để ứng dụng Flask lắng nghe
EXPOSE 5000

# Chạy ứng dụng Flask
CMD ["python", "run.py"]