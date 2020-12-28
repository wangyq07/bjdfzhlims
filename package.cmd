cd deploy/
del /q/s *.*
rd  /s/q  g:\lims\bjdfzhlims\web\dist\bjdflims 
cd  ..\web
call ng build --prod --aot   --base-href ./ 
rd /s/q G:\lims\bjdfzhlims\java\web\src\main\resources\static\assets\
del /q/s  G:\lims\bjdfzhlims\java\web\src\main\resources\static\*.*
xcopy     G:\lims\bjdfzhlims\web\dist\bjdflims  G:\lims\bjdfzhlims\java\web\src\main\resources\static  /s/e
cd G:\lims\bjdfzhlims
call mvn clean install  -f G:\lims\bjdfzhlims\java\pom.xml
call mvn package -f G:\lims\bjdfzhlims\java\pom.xml
copy   g:\lims\bjdfzhlims\java\businessprocess\target\businessprocess-0.0.1-SNAPSHOT.jar  g:\lims\\bjdfzhlims\deploy\businessprocess.jar  
copy   g:\lims\bjdfzhlims\java\flowprocess\target\flowprocess-0.0.1-SNAPSHOT.jar  g:\lims\\bjdfzhlims\deploy\flowprocess.jar  
copy   g:\lims\bjdfzhlims\java\flownotify\target\flownotify-0.0.1-SNAPSHOT.jar  g:\lims\\bjdfzhlims\deploy\flownotify.jar  
copy   g:\lims\bjdfzhlims\java\collectionreceiveprocess\target\collectionreceiveprocess-0.0.1-SNAPSHOT.jar  g:\lims\\bjdfzhlims\deploy\collectionreceiveprocess.jar  
copy   g:\lims\bjdfzhlims\java\userprivilage\target\userprivilage-0.0.1-SNAPSHOT.jar  g:\lims\bjdfzhlims\deploy\userprivilage.jar   
copy   G:\lims\bjdfzhlims\java\web\target\web-0.0.1-SNAPSHOT.jar  g:\lims\bjdfzhlims\deploy\web.jar  

 

