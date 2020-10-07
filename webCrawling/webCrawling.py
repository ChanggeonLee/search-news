#!/usr/bin/env python
# coding: utf-8

# In[30]:
import datetime
import urllib.request
from bs4 import BeautifulSoup
import time
from elasticsearch import Elasticsearch, helpers


# In[43]:


days_range = []

start = datetime.datetime.strptime("2020-05-01", "%Y-%m-%d")
end = datetime.datetime.strptime("2020-09-16", "%Y-%m-%d") # 범위 + 1
date_generated = [start + datetime.timedelta(days=x) for x in range(0, (end-start).days)]

for date in date_generated:
    days_range.append(date.strftime("%Y%m%d"))

print(days_range)


# In[44]:


es = Elasticsearch("http://172.19.0.2:9200/")
print(es.info())


# In[45]:


index_name = 'news'
es.indices.delete(index=index_name, ignore=[400, 404])
body = {
  "settings": {
    "analysis": {
      "analyzer": {
        "nori": {
          "tokenizer": "nori_tokenizer"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "nori": {
            "type": "text",
            "analyzer": "nori"
          }
        }
      }
    }
  }
}

es.indices.create(index=index_name, body=body)


# In[46]:


# 기사 목록 가져오기
base_url = "https://news.naver.com/main/list.nhn?mode=LSD&mid=sec&date="
for date in days_range:
    date_url = base_url + (date)
    for i in range(100, 106):
        url = date_url + "&sid1=" + str(i)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req).read()

        soup = BeautifulSoup(response, "html.parser")
        results = soup.select("dt.photo")
        
        print(url)
        for result in results:
            print("제목 : ", result.a.img.attrs["alt"])
            # print("img_url : ", result.a.img.attrs["src"])
#             print("url : ", result.a.attrs["href"])
#             print("\n")
            doc = {
                'title': result.a.img.attrs["alt"],   
                'url': result.a.attrs["href"],
                'img' : result.a.img.attrs["src"]
            }
            es.index(index=index_name, doc_type='_doc', body=doc)


# In[48]:


# test query
results = es.search(index=index_name, body={'from':0, 'size':3, 'query':{'match':{'title.nori':'코로나'}}})
for result in results['hits']['hits']:
    print('score:', result['_score'], 'source:', result['_source'])

