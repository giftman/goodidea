#!/bin/shell

import urllib2

body = "game_id=%d&interface_version=v1.0&charset=utf-8&sign=%s&token=5822C880E8C057D770D3E632CA22720B"
def md5(data):
    import hashlib
    return hashlib.md5(data).hexdigest()

def main():
    for page in range(1,29):
        sign ='utf-8%sv1.05822C880E8C057D770D3E632CA22720B' % (page)
        sign = md5(sign)
        data = body % (page,sign)
        print data
        req = urllib2.Request('http://www.zhengdiangame.net/phone/game-configs',data=data)
        result = urllib2.urlopen(req)
        fileName = 'method%d' % page
        with open(fileName,'w') as f:
            f.write(result.read())



if __name__ == '__main__':
    main()
