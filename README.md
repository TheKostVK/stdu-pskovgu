<a href="https://github.com/TheKostVK/stdu-pskovgu"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&center=%D0%BB%D0%BE%D0%B6%D1%8C&vCenter=%D0%BB%D0%BE%D0%B6%D1%8C&repeat=%D0%B2%D0%B5%D1%80%D0%BD%D0%BE&width=435&lines=stdu-pskovgu" alt="Typing SVG" /></a>

<h1 align="center">Проект сайта с расписание ПсковГУ <a href="https://stdu-pskovgu.ru/" target="_blank">stdu-pskovgu</a> 
<h3 align="center">Python Code, Django</h3>
<img align="right" src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>



<h5 align="left">Проект сайта с расписанием для ПсковГУ.</h5>
<p align="left">Написан с помощью фреймворка Django на Python.
За основу был взят мой старый проект интернет магазина на Django, поэтому в моделях можно обнаружить названия не совсем подходящие под тематику сайта, но тк сроки поджимали пришлось сделать так.
JS отчасти написаны нами, но от части взяты с сайта APPLE.
Часть CSS таблиц стилей взяты с сайта APPLE (можете встретить упоминания их техники в названиях стилей :)  ).
Само расписание генерируется на основе данных получаемых из парсера.
Комментариев в файлах вообще нет, тк не предполагалось что данный проект будет в открытом доступе, да и делался он несколькими людьми которые и так отлично разбирались в том что здесь написано).
Если кто-то решит довести дело до конца, то желательно уведомить об этом, во избежание каких либо недоразумений.
</p>

 #Cтарт приложения
  
 Будем считать, что у вас уже установлен <a href="https://docs.djangoproject.com/en/4.1/intro/install/">Django</a>, а так же создана копия репозитория.
  
 ####Сервер разработки

`python manage.py runserver`

По умолчанию runserver команда запускает сервер разработки по внутреннему IP-адресу на порту 8000.

Для доступа к серверу разработки перейдите по <a href="http://127.0.0.1:8000/">ссылке</a>.

 ####Создание Базы Данных
 
После запуска сервер, убедившись, что все работает, остановите сервер и выполните эти команды по очередно:

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py collectstatic`

 ####Создание суперпользователя

Если не произошло никаких ошибок и в корневом каталоге создалась База Данных, то можно переходить к созданию суперпользователя, для этого введите команду, во время ее выполнения вам нужно будет ввести име пользователя, пароль, электронную почту:

`django-admin createsuperuser`
  
  
Теперь вы можете снова запустить приложение с помощью команды:

`python manage.py runserve`
  
Сайт готов к использованию, логинтесь под только что созданным аккаунтом и переходите в профиль, там будет ссылка на админ панель.
Чтобы пропарсить расписание необходимо в файле `page_crafter.py` изменить дату в строке `238` на дату первого дня в расписании на официальном сайте ВУЗа.
