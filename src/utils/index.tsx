// 验证是否为手机号
export function checkTelephone(telephone: string) {
  const reg = /^[1][3456789][0-9]{9}$/;
  if (!reg.test(telephone)) {
    return false;
  } else {
    return true;
  }
}
