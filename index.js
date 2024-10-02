const express = require('express');
const cors = require('cors');
const path = require('path');
const spawn = require('child_process').spawn;
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

// get /
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// get random
app.get('/random/:count', (req, res) => {
  const firstParam = "random";
  const secondParam = req.params.count; // URL의 :count 값을 가져와 저장
  
  const scriptPath = path.join(__dirname, "resolver.py")
  // const pythonPath = path.join("C:", "conda", "envs", "recom_env", "python.exe");
  const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');

  const result = spawn(pythonPath, [scriptPath, firstParam, secondParam]);
  let responseData = '';

  // Python script 출력 결과를 받아온다.
  result.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  // child process 이벤트 종료시 핸들링
  result.on('close', (code) => {
    if (code === 0) {
      const jsonResponse = JSON.parse(responseData);
      res.status(200).json(jsonResponse);
    } else {
      res
        .status(500).json({ error: `Child process exited with code ${code}` });
    }
  });

  // Python script Error 출력
  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

});

// get latest
app.get('/latest/:count', (req, res) => {
  const firstParam = "latest";
  const secondParam = req.params.count; // URL의 :count 값을 가져와 저장
  
  const scriptPath = path.join(__dirname, "resolver.py")
  // const pythonPath = path.join("C:", "conda", "envs", "recom_env", "python.exe");
  const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');

  const result = spawn(pythonPath, [scriptPath, firstParam, secondParam]);
  let responseData = '';

  // Python script 출력 결과를 받아온다.
  result.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  // child process 이벤트 종료시 핸들링
  result.on('close', (code) => {
    if (code === 0) {
      const jsonResponse = JSON.parse(responseData);
      res.status(200).json(jsonResponse);
    } else {
      res
        .status(500).json({ error: `Child process exited with code ${code}` });
    }
  });

  // Python script Error 출력
  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

// get genres
app.get('/genres/:genre/:count', (req, res) => {
  const firstParam = "genres";
  const secondParam = req.params.genre; // URL의 :genre 값을 가져와 저장
  const thirdParam = req.params.count; // URL의 :count 값을 가져와 저장
  
  const scriptPath = path.join(__dirname, "resolver.py")
  // const pythonPath = path.join("C:", "conda", "envs", "recom_env", "python.exe");
  const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');

  const result = spawn(pythonPath, [scriptPath, firstParam, secondParam, thirdParam]);
  let responseData = '';

  // Python script 출력 결과를 받아온다.
  result.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  // child process 이벤트 종료시 핸들링
  result.on('close', (code) => {
    if (code === 0) {
      const jsonResponse = JSON.parse(responseData);
      res.status(200).json(jsonResponse);
    } else {
      res
        .status(500).json({ error: `Child process exited with code ${code}` });
    }
  });

  // Python script Error 출력
  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

app.get('/item-based/:item', (req, res) => {
  const firstParam = "item-based";
  const secondParam = req.params.item; // URL의 :count 값을 가져와 저장
  
  const scriptPath = path.join(__dirname, "recommender.py")
  // const pythonPath = path.join("C:", "conda", "envs", "recom_env", "python.exe");
  const pythonPath = path.join(__dirname, 'venv', 'bin', 'python3');


  const result = spawn(pythonPath, [scriptPath, firstParam, secondParam]);
  let responseData = '';

  // Python script 출력 결과를 받아온다.
  result.stdout.on('data', (data) => {
    responseData += data.toString();
  });
  
  // child process 이벤트 종료시 핸들링
  result.on('close', (code) => {
    if (code === 0) {
      const jsonResponse = JSON.parse(responseData);
      res.status(200).json(jsonResponse);
    } else {
      res
        .status(500).json({ error: `Child process exited with code ${code}` });
    }
  });

  // Python script Error 출력
  result.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
