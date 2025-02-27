@echo off
REM Create directories
mkdir src\assets
mkdir src\components
mkdir src\components\common
mkdir src\components\admin
mkdir src\components\user
mkdir src\context
mkdir src\hooks
mkdir src\pages
mkdir src\pages\admin
mkdir src\pages\user
mkdir src\styles
mkdir src\utils

REM Create JSX files
echo // App.jsx > src\App.jsx
echo // index.jsx > src\index.jsx
echo // Login.jsx > src\pages\Login.jsx
echo // AdminDashboard.jsx > src\pages\admin\AdminDashboard.jsx
echo // AdminRoomDeviceManagement.jsx > src\pages\admin\AdminRoomDeviceManagement.jsx
echo // AdminUserManagement.jsx > src\pages\admin\AdminUserManagement.jsx
echo // UserDashboard.jsx > src\pages\user\UserDashboard.jsx
echo // UserRoomDeviceManagement.jsx > src\pages\user\UserRoomDeviceManagement.jsx

REM Create corresponding CSS files for each JSX file
echo /* App.css */ > src\App.css
echo /* Login.css */ > src\styles\Login.css
echo /* AdminDashboard.css */ > src\styles\AdminDashboard.css
echo /* AdminRoomDeviceManagement.css */ > src\styles\AdminRoomDeviceManagement.css
echo /* AdminUserManagement.css */ > src\styles\AdminUserManagement.css
echo /* UserDashboard.css */ > src\styles\UserDashboard.css
echo /* UserRoomDeviceManagement.css */ > src\styles\UserRoomDeviceManagement.css

REM Create a global styles file
echo /* main.css */ > src\styles\main.css

echo Folder structure and files created successfully.
pause
