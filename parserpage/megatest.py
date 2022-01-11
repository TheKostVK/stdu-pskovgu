import datetime
import time


def get_weekdays_numb(p):
    p -= 1
    WEEK = 34 + p
    if WEEK >= 52:
        WEEK = WEEK - 52
        now = datetime.datetime.now()
        year = now.strftime("%Y")
    else:
        now = datetime.datetime.now()
        year = str(int(now.strftime("%Y")) - 1)
    startdate = time.asctime(time.strptime(f'{year} %d 0' % WEEK, '%Y %W %w'))
    startdate = datetime.datetime.strptime(startdate, '%a %b %d %H:%M:%S %Y')
    dates = [startdate.strftime('%d.%m.%Y')]
    for i in range(1, 7):
        day = startdate + datetime.timedelta(days=i)
        dates.append(day.strftime('%d.%m.%Y'))
    return dates