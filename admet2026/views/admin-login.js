module.exports = function adminLogin({ error }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Admin Login – AdMet-2026</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#0a2a4a 0%,#1a6040 100%);min-height:100vh;display:flex;align-items:center;justify-content:center}
  .login-card{background:#fff;border-radius:12px;padding:48px 40px;width:360px;box-shadow:0 20px 60px rgba(0,0,0,0.3);text-align:center}
  .login-logo{width:80px;height:80px;border-radius:50%;background:#0a2a4a;color:#fff;font-size:18px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;border:3px solid #c8a000}
  h1{font-size:20px;color:#0a2a4a;margin-bottom:6px}
  p.sub{font-size:13px;color:#666;margin-bottom:28px}
  .form-group{margin-bottom:18px;text-align:left}
  label{display:block;font-size:13px;font-weight:600;color:#333;margin-bottom:6px}
  input[type=password]{width:100%;padding:11px 14px;border:1.5px solid #cdd;border-radius:6px;font-size:15px;outline:none;transition:border .2s}
  input[type=password]:focus{border-color:#0a2a4a}
  .btn-login{width:100%;padding:13px;background:#0a2a4a;color:#fff;border:none;border-radius:6px;font-size:15px;font-weight:700;cursor:pointer;transition:background .2s}
  .btn-login:hover{background:#1a3a6a}
  .error{background:#fef2f2;border:1px solid #fca5a5;color:#b91c1c;padding:10px 14px;border-radius:6px;font-size:13px;margin-bottom:18px}
  .back-link{display:block;margin-top:18px;font-size:13px;color:#1a6040;text-decoration:none}
  .back-link:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="login-card">
  <div class="login-logo">AdMet</div>
  <h1>Admin Panel</h1>
  <p class="sub">AdMet-2026 Conference Website Management</p>
  ${error ? `<div class="error">⚠ ${error}</div>` : ''}
  <form method="POST" action="/admin/login">
    <div class="form-group">
      <label for="password">Admin Password</label>
      <input type="password" id="password" name="password" placeholder="Enter password" required autofocus/>
    </div>
    <button type="submit" class="btn-login">Login →</button>
  </form>
  <a href="/" class="back-link">← Back to Conference Website</a>
</div>
</body>
</html>`;
};
