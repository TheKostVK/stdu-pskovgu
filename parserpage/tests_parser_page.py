import datetime
import re
import time

import requests
from bs4 import BeautifulSoup

version_script = "v2.0.2"


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


def week_days(week, first_day, last_week_day, first_week):
    if last_week_day == 0:
        week = first_week
        return week
    last_week_day = str(last_week_day).replace('ПНД,', '').replace('.', ' ').split()[0:3]
    first_day = str(first_day).replace('ПНД,', '').replace('.', ' ').split()[0:3]
    b = first_day[::-1]
    a = last_week_day[::-1]
    aa = datetime.date(int(a[0]), int(a[1]), int(a[2]))
    bb = datetime.date(int(b[0]), int(b[1]), int(b[2]))
    cc = (aa - bb) // 7
    dd = str(cc)
    dd = -1 * int(dd.split()[0])
    week = week + int(dd)
    return week


def html_data_crafter(tab, meaning):
    if meaning == 0:
        tab = f'<th class="table-lesson-numbers"><div class="table-lesson-num">{tab}</div></th>'
    elif meaning == 7:
        tab = f'<th class="table-lesson-numbers"><div class="table-lesson-num">{tab}</div></th>'
    else:
        tab = f'<th class="table-lesson-numbers"><div class="table-lesson-num">{tab}</div></th>'
    return tab


def html_number_crafter(tab):
    tab = f'<th class="table-lesson-numbers"><div class="table-time">{tab}</div></th>'
    return tab


def html_weekday_lesson_crafter(tab):
    tab = tab.replace(',', ' ')
    weekday = tab.split()[0]
    tab = tab.replace(weekday, ' ')
    tab = f'<th class="table-weekdays">{weekday}<br>{tab}</th>'
    return tab


def html_lesson_crafter(tab):
    if tab == '':
        tab = f'<td class="table-empty"> — </td>'
        return tab
    tab = str(tab)
    cabinet_number = tab.split()[-1]
    if 'О-нлайн' in cabinet_number or 'О-онлайн' in cabinet_number:
        style = 'color-online'
    elif 'л.' in tab:
        style = 'color-lecture'
    else:
        style = ''
    if 'лаб.' in tab:
        type_of_lesson = 'Лабораторная работа'
        tab = tab.replace("лаб.", " ")
    elif 'пр.' in tab:
        type_of_lesson = 'Практика'
        tab = tab.replace("пр.", " ")
    elif 'л.' in tab:
        type_of_lesson = 'Лекция'
        tab = tab.replace("л.", " ")
    elif 'зач.' in tab:
        type_of_lesson = 'Зачет'
        tab = tab.replace("зач.", " ")
        style = 'color-zach'
    elif 'зчО.' in tab:
        type_of_lesson = 'Зачет с оценкой'
        tab = tab.replace("зчО.", " ")
        style = 'color-zach'
    elif 'экз.' in tab:
        type_of_lesson = 'Экзамен'
        tab = tab.replace("экз.", " ")
        style = 'color-zach'
    else:
        type_of_lesson = ''
    if 'Физическая культура и спорт' in tab:
        lesson_name = 'Физическая культура и спорт'
        tab = tab.replace("(п/г 1)", " ")
        tab = tab.replace("(п/г 2)", " ")
        tab = tab.replace("Физическая культура и спорт", " ")
        teacher_name_1 = tab.split()[0] + " " + tab.split()[1]
        teacher_name_2 = tab.split()[-3] + " " + tab.split()[-2]
        cabinet_number_1 = tab.split()[2]
        cabinet_number_2 = tab.split()[-1]
        if teacher_name_1 == teacher_name_2:
            tab = f'<td class="table-single {style}"><div class="table-subject">{lesson_name}</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-teacher">{teacher_name_1} / {cabinet_number_1}</div></td>'
        else:
            tab = f'<td class="table-single {style}"><div class="table-subject">{lesson_name}</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-teacher">{teacher_name_1} / {cabinet_number_1}</div><div class="table-room">{teacher_name_2} / {cabinet_number_2}</div></td>'
    elif 'фв Общая физическая подготовка' in tab:
        lesson_name = 'Общая физическая подготовка'
        tab = tab.replace("(п/г 1)", " ")
        tab = tab.replace("(п/г 2)", " ")
        tab = tab.replace("Общая физическая подготовка", " ")
        teacher_name_1 = tab.split()[0] + " " + tab.split()[1]
        teacher_name_2 = tab.split()[-3] + " " + tab.split()[-2]
        cabinet_number_1 = tab.split()[2]
        cabinet_number_2 = tab.split()[-1]
        if teacher_name_1 == teacher_name_2:
            tab = f'<td class="table-single {style}"><div class="table-subject">{lesson_name}</div><div class="table-teacher">{teacher_name_1} / {cabinet_number_1}</div></td>'
        else:
            tab = f'<td class="table-single {style}"><div class="table-subject">{lesson_name}</div><div class="table-teacher">{teacher_name_1} / {cabinet_number_1}</div><div class="table-room">{teacher_name_2} / {cabinet_number_2}</div></td>'
    elif ('(п/г 1)' in tab and '(п/г 2)' in tab) or ('п/г1' in tab and 'п/г2' in tab):
        if '(п/г 1)' in tab or '(п/г 2)' in tab:
            tab = tab.replace("(п/г 1)", " (№1) ")
            tab = tab.replace("(п/г 2)", " (№2) ")
            tab = tab.replace("п/г1", " ")
            tab = tab.replace("п/г2", " ")
        else:
            tab = tab.replace("п/г1", " (№1) ")
            tab = tab.replace("п/г2", " (№2) ")
            tab = tab.replace("(п/г 1)", " ")
            tab = tab.replace("(п/г 2)", " ")
        if 'Основы информационной культуры и безопасности' in tab:
            lesson_name = 'Основы информационной культуры и безопасности'
            tab_clr = tab.replace('Основы информационной культуры и безопасности', ' ')
            teacher_name_1 = ''
            teacher_name_2 = ''
            cc = 1
            for n in tab_clr.split(' '):
                if cc == 1:
                    if n == '(№1)':
                        pass
                    elif n != '(№2)':
                        teacher_name_1 = teacher_name_1 + ' ' + n
                    elif n == '(№2)':
                        cc += 1
                else:
                    teacher_name_2 = teacher_name_2 + ' ' + n
            tab = f'<td class="table-subgroup color-together"><div class="table-sg-name">Подгруппы №1 №2</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-subject">{lesson_name}</div><div class="table-teacher">(№1) {teacher_name_1}</div><div class="table-room">(№2) {teacher_name_2}</div></td>'
        else:
            test_tab = tab.split()[-3]
            if len(re.sub(r'([А-Я])', r' \1', test_tab).split()) >= 2:
                lesson_name = ' '.join(tab.split()[0:-3]) + ' ' + re.sub(r'([А-Я])', r' \1', test_tab).split()[0]
            else:
                lesson_name = ' '.join(tab.split()[0:-3])
            tab = f'<td class="table-subgroup color-together"><div class="table-sg-name">Подгруппы №1 №2</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-subject">{lesson_name}</div></td>'

    elif '(п/г 1)' in tab or 'п/г1' in tab:
        if '(п/г 1)' in tab:
            tab = tab.replace("(п/г 1)", " ")
        else:
            tab = tab.replace("п/г1", " ")
        test_tab = tab.split()[-3]
        if len(re.sub(r'([А-Я])', r' \1', test_tab).split()) >= 2:
            teacher_name = re.sub(r'([А-Я])', r' \1', test_tab).split()[1] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3]) + ' ' + re.sub(r'([А-Я])', r' \1', test_tab).split()[0]
        else:
            teacher_name = tab.split()[-3] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3])
        tab = f'<td class="table-subgroup {style}"><div class="table-sg-name">Подгруппа №1</div><div class="table-subject">{lesson_name}</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-teacher">{teacher_name}</div><div class="table-room">{cabinet_number}</div></td>'
    elif '(п/г 2)' in tab or 'п/г2' in tab:
        if '(п/г 2)' in tab:
            tab = tab.replace("(п/г 2)", " ")
        else:
            tab = tab.replace("п/г2", " ")
        test_tab = tab.split()[-3]
        if len(re.sub(r'([А-Я])', r' \1', test_tab).split()) >= 2:
            teacher_name = re.sub(r'([А-Я])', r' \1', test_tab).split()[1] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3]) + ' ' + re.sub(r'([А-Я])', r' \1', test_tab).split()[0]
        else:
            teacher_name = tab.split()[-3] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3])
        tab = f'<td class="table-subgroup {style}"><div class="table-sg-name">Подгруппа №2</div><div class="table-subject">{lesson_name}</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-teacher">{teacher_name}</div><div class="table-room">{cabinet_number}</div></td>'
    else:
        test_tab = tab.split()[-3]
        if len(re.sub(r'([А-Я])', r' \1', test_tab).split()) >= 2:
            teacher_name = re.sub(r'([А-Я])', r' \1', test_tab).split()[1] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3]) + ' ' + re.sub(r'([А-Я])', r' \1', test_tab).split()[0]
        else:
            teacher_name = tab.split()[-3] + " " + tab.split()[-2]
            lesson_name = ' '.join(tab.split()[0:-3])
        tab = f'<td class="table-single {style}"><div class="table-subject">{lesson_name}</div><div class="table-lessontype">{type_of_lesson}</div><div class="table-teacher">{teacher_name}</div><div class="table-room">{cabinet_number}</div></td>'
    return tab


def full_tables():
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15"
    }

    count_rest = 1

    nach_lvl = 1

    total_groups = 0

    # Вычисление номера недели
    now = datetime.datetime.now()
    a = ("2022-02-07")
    b = now.strftime("%Y-%m-%d")
    a = a.split('-')
    b = b.split('-')
    aa = datetime.date(int(a[0]), int(a[1]), int(a[2]))
    bb = datetime.date(int(b[0]), int(b[1]), int(b[2]))
    cc = (aa - bb)
    dd = str(cc)
    dd = -1 * int(dd.split()[0]) // 7 + 1

    # Перебор карт факультетов
    while count_rest < 9:
        if count_rest == 1:
            print('\nИнститут инженерных наук')
            url = "http://rasp.pskgu.ru/instO6.html"
        elif count_rest == 2:
            print('\nИнститут образования и социальных наук')
            url = "http://rasp.pskgu.ru/instO2.html"
        elif count_rest == 3:
            print('\nИнститут медицины и экспериментальной биологии')
            url = "http://rasp.pskgu.ru/instO3.html"
        elif count_rest == 4:
            print('\nИнститут гуманитарных наук и языковых коммуникаций')
            url = "http://rasp.pskgu.ru/instO4.html"
        elif count_rest == 5:
            print('\nИнститут математического моделирования и игропрактики')
            url = "http://rasp.pskgu.ru/instO5.html"
        elif count_rest == 6:
            print('\nИнститут права, экономики и управления')
            url = "http://rasp.pskgu.ru/instO1.html"
        elif count_rest == 7:
            print('\nНулевая группа')
            url = "http://rasp.pskgu.ru/instO8.html"
        elif count_rest == 8:
            print('\nИностранные студенты')
            url = "http://rasp.pskgu.ru/instO7.html"
        r = requests.get(url=url, headers=headers)
        r.encoding = 'utf-8'

        soup = BeautifulSoup(r.text, "lxml")

        articles_card = soup.find_all("td")

        for article in articles_card:
            try:
                # Получение ссылки на группу
                group_url = f'{article.find("a").get("href", "-")}'

                article_id = group_url[::]

                article_id = article_id.replace('\\', '/')

                url = f'http://rasp.pskgu.ru/{article_id}'

                response = requests.get(url=url, headers=headers)
                response.encoding = 'utf-8'

                # Парсинг групп
                soup = BeautifulSoup(response.text, "lxml")
                tables = soup.find("div", class_="container").find_all("tbody")

                # У начальных групп сбито на неделю расписание
                if count_rest == 7:
                    group_name = f'Начальный{nach_lvl}'
                    nach_lvl += 1
                else:
                    group_name = soup.find("div", class_="col-12").find_all("b")
                    group_name = str(group_name).split()[1]
                first_week = soup.find("div", class_="col-12").find_all("b")
                first_week = int(str(first_week).split()[-2::][0])
                last_week_numb = first_week
                week = first_week
                full_tables_html = ''
                scroll = ''
                first_day = 0

                # Перебор таблиц по неделям у группы
                for table in tables:
                    output = []
                    for row in table.findAll("tr"):
                        new_row = []
                        for cell in row.findAll(["td", "th"]):
                            new_row.append(cell.get_text().strip())
                        output.append(new_row)
                    last_week_day = first_day
                    html = ''
                    count = 0
                    for n in output[0]:
                        if count == 0 or count == 7:
                            html = html + str(html_data_crafter(n, count))
                        else:
                            html = html + str(html_data_crafter(n, count))
                        count += 1
                    html = html + '</tr><tr>'
                    for n in output[1]:
                        html = html + str(html_number_crafter(n))
                    html = html + '</tr><tr>'
                    count_week_num = 0
                    for n in output[2][0:1]:
                        count_week_num += 1
                        if count_week_num == 1:
                            first_day = n
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[2][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    html = html + '</tr><tr>'
                    for n in output[3][0:1]:
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[3][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    html = html + '</tr><tr>'
                    for n in output[4][0:1]:
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[4][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    html = html + '</tr><tr>'
                    for n in output[5][0:1]:
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[5][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    html = html + '</tr><tr>'
                    for n in output[6][0:1]:
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[6][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    html = html + '</tr><tr>'
                    for n in output[7][0:1]:
                        html = html + str(html_weekday_lesson_crafter(n))
                    for n in output[7][1:9]:
                        html = html + str(html_lesson_crafter(n))
                    week = int(week_days(week, first_day, last_week_day, first_week))
                    countt = week
                    # Если совпадает номер таблицы и номер недели, то мы помечаем ее скролом
                    if dd == countt:
                        print('\t' + group_name)
                        html2 = '<table id="schedule-table"><tbody style=''><tr>' + html + ' </tr></tbody></table>'
                        my_file = open(f"..//mainapp/templates/ui_interface/tables/{group_name}.html", 'wb')
                        my_file.write(str(html2).encode('utf-8'))
                        my_file.close()
                    n = week - last_week_numb
                    # Компенсируем промежутки между неделями
                    if n > 1:
                        html2 = ''
                        n -= 1
                        while n != 0:
                            week_numb = week - n
                            week_days_numb = get_weekdays_numb(week_numb)
                            if week_numb == dd:
                                print('\t' + group_name)
                                scroll = '<div id="scroll"></div>'
                                html3 = f'<table id="schedule-table"><tbody><tr><th class="table-lesson-numbers"><div class="table-lesson-num" style=''>Пары</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">1-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">2-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">3-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">4-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">5-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">6-я</div></th><th style="border-radius: 0 5px 0 0;" class="table-lesson-numbers"><div class="table-lesson-num">7-я</div></th></tr><tr><th class="table-lesson-numbers"><div class="table-time">Время</div></th><th class="table-lesson-numbers"><div class="table-time">08:30-10:00</div></th><th class="table-lesson-numbers"><div class="table-time">10:15-11:45</div></th><th class="table-lesson-numbers"><div class="table-time">12:30-14:00</div></th><th class="table-lesson-numbers"><div class="table-time">14:15-15:45</div></th><th class="table-lesson-numbers"><div class="table-time">16:00-17:30</div></th><th class="table-lesson-numbers"><div class="table-time">18:00-19:30</div></th><th class="table-lesson-numbers"><div class="table-time">19:40-21:10</div></th></tr><tr><th class="table-weekdays">ПНД <br> {week_days_numb[1]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ВТР <br> {week_days_numb[2]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">СРД <br> {week_days_numb[3]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ЧТВ <br> {week_days_numb[4]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ПТН <br> {week_days_numb[5]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">СБТ <br> {week_days_numb[6]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr></tbody></table>'
                                my_file = open(f"..//mainapp/templates/ui_interface/tables/{group_name}.html", 'wb')
                                my_file.write(str(html3).encode('utf-8'))
                                my_file.close()
                            html2 = html2 + f'{scroll}<div><p style="margin-bottom: 5px; text-align: center; margin-bottom: 15px; margin-top: 30px;" href=""class="typography-plan-copy">Неделя: {week_numb}</p></div><div class="copy-container" style="border-radius: 5px;" id="includedContent"><table id="schedule-table"><tbody><tr><th class="table-lesson-numbers"><div class="table-lesson-num">Пары</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">1-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">2-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">3-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">4-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">5-я</div></th><th class="table-lesson-numbers"><div class="table-lesson-num">6-я</div></th><th style="border-radius: 0 5px 0 0;" class="table-lesson-numbers"><div class="table-lesson-num">7-я</div></th></tr><tr><th class="table-lesson-numbers"><div class="table-time">Время</div></th><th class="table-lesson-numbers"><div class="table-time">08:30-10:00</div></th><th class="table-lesson-numbers"><div class="table-time">10:15-11:45</div></th><th class="table-lesson-numbers"><div class="table-time">12:30-14:00</div></th><th class="table-lesson-numbers"><div class="table-time">14:15-15:45</div></th><th class="table-lesson-numbers"><div class="table-time">16:00-17:30</div></th><th class="table-lesson-numbers"><div class="table-time">18:00-19:30</div></th><th class="table-lesson-numbers"><div class="table-time">19:40-21:10</div></th></tr><tr><th class="table-weekdays">ПНД <br> {week_days_numb[1]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ВТР <br> {week_days_numb[2]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">СРД <br> {week_days_numb[3]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ЧТВ <br> {week_days_numb[4]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">ПТН <br> {week_days_numb[5]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr><tr><th class="table-weekdays">СБТ <br> {week_days_numb[6]}</th><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td><td class="table-empty"> — </td></tr></tbody></table></div>'
                            n -= 1
                        if countt != dd:
                            scroll = ''
                        else:
                            scroll = '<div id="scroll"></div>'
                        html = html2 + f'{scroll}<div><p style="margin-bottom: 5px; text-align: center; margin-bottom: 15px; margin-top: 30px;" href=""class="typography-plan-copy">Неделя: {week}</p></div><div class="copy-container" style="border-radius: 5px;" id="includedContent"><table id="schedule-table"><tbody><tr>' \
                               + html + \
                               f'</tr></tbody></table></div>'
                        last_week_numb = week
                    else:
                        if countt != dd:
                            scroll = ''
                        else:
                            scroll = '<div id="scroll"></div>'
                        last_week_numb = week
                        html = f'{scroll}<div><p style="margin-bottom: 5px; text-align: center; margin-bottom: 15px; margin-top: 30px;" href=""class="typography-plan-copy">Неделя: {week}</p></div><div class="copy-container" style="border-radius: 5px;" id="includedContent"><table id="schedule-table"><tbody><tr>' \
                               + html + \
                               '</tr></tbody></table></div>'
                    full_tables_html = full_tables_html + html
                full_tables_html = full_tables_html + f'<div class="updatetext" style="text-align: center;">Последнее обновление: {now.strftime("%d-%m-%Y %H:%M:%S")} {version_script}</div>'
                group_name = group_name.replace(' ', '')
                print('\t' + group_name + 'f')
                my_file = open(f"..//mainapp/templates/ui_interface/full_tables/{group_name}f.html", 'wb')
                my_file.write(str(full_tables_html).encode('utf-8'))
                my_file.close()

                total_groups += 1

            except:
                pass

        count_rest += 1
    print('\nВсего групп: ' + str(total_groups))


def main():
    print('\n' + version_script)
    print('\nTask start')
    full_tables()
    now = datetime.datetime.now()
    print('\nCode: ' + str(now.day) + str(now.month) + str(now.hour) + str(1488))
    print("\nTask complete")


if __name__ == '__main__':
    main()
