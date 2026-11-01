import Razorpay from 'razorpay';
import crypto from 'crypto';

/**
 * Returns true if real Razorpay credentials (not mock/placeholder) are present in the environment.
 */
export function isRazorpayConfigured(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return false;
  if (keyId.includes('mock') || keyId.includes('your_key_id')) return false;
  if (keySecret.includes('mock') || keySecret.includes('your_razorpay_secret')) return false;

  return true;
}

/**
 * Returns a configured Razorpay instance or null if keys are not set.
 */
export function getRazorpayClient(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

/**
 * Cryptographically verifies Razorpay payment signature using HMAC SHA256.
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // In local test/simulation mode without real keys, accept mock IDs
  if (!keySecret || keySecret.includes('mock') || orderId.startsWith('order_mock')) {
    return true;
  }

  try {
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    // Prevent timing attacks with constant-time comparison
    const generatedBuffer = Buffer.from(generatedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (generatedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(generatedBuffer, signatureBuffer);
  } catch (err) {
    console.error('Error verifying Razorpay signature:', err);
    return false;
  }
}

/**
 * Verifies Razorpay Webhook signature using HMAC SHA256.
 */
export function verifyWebhookSignature({
  payload,
  signature,
  secret,
}: {
  payload: string;
  signature: string;
  secret: string;
}): boolean {
  try {
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const generatedBuffer = Buffer.from(generatedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (generatedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(generatedBuffer, signatureBuffer);
  } catch (err) {
    console.error('Error verifying Razorpay webhook signature:', err);
    return false;
  }
}
