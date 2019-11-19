function verifyMobile(mobile: string): boolean {
  return /\d{11}/.test(mobile.trim());
}

const VerifyUtils = {
  verifyMobile,
};

export default VerifyUtils;
