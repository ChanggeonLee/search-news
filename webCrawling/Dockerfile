# Dockerfile
# without an file extension

# Use an official Python runtime as a parent image 
FROM python:3.7-slim 

# Set the working directory to /webCrawling 
WORKDIR /webCrawling 

# Copy the current directory contents into the container at /webCrawling 
COPY . /webCrawling  

# Install any needed packages specified in requirements.txt 
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Run webCrawling.py when the container launches 
CMD ["python", "webCrawling.py"]