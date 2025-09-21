/**
 * Payment Processing Module
 * WARNING: Contains intentional security issues for AI review testing
 */

const stripe = require('stripe');

// BAD: Hardcoded API key (simulated for testing)
const STRIPE_KEY = 'sk_test_' + 'FAKE_KEY_FOR_TESTING_AI_REVIEW';
const WEBHOOK_SECRET = 'webhook_' + 'secret_exposed_in_code';

class PaymentProcessor {
  constructor() {
    // BAD: API key exposed in constructor
    this.stripe = stripe(STRIPE_KEY);

    // BAD: Storing sensitive data in memory
    this.creditCardNumbers = [];
    this.customerData = {};
  }

  /**
   * Process payment - INSECURE IMPLEMENTATION
   */
  async processPayment(amount, cardNumber, cvv, customerId) {
    // BAD: Logging sensitive information
    console.log(`Processing payment: ${amount} for card ${cardNumber}`);
    console.log(`CVV: ${cvv}`);

    // BAD: No input validation
    const charge = await this.stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: cardNumber,
      description: `Payment from customer ${customerId}`
    });

    // BAD: Storing card numbers in plain text
    this.creditCardNumbers.push(cardNumber);

    // BAD: Weak random number generation for transaction ID
    const transactionId = Math.random().toString(36).substring(7);

    return {
      success: true,
      transactionId,
      amount,
      // BAD: Returning sensitive data
      cardNumber
    };
  }

  /**
   * Webhook handler - vulnerable to replay attacks
   */
  async handleWebhook(payload, signature) {
    // BAD: No signature verification
    const event = JSON.parse(payload);

    // BAD: No idempotency check
    switch(event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event);
        break;
      case 'payment_intent.failed':
        // BAD: No error handling
        break;
    }

    return { received: true };
  }

  /**
   * Refund processing - no authorization check
   */
  async processRefund(transactionId, amount) {
    // BAD: No authorization or validation
    // Anyone can refund any transaction

    // BAD: SQL injection vulnerability
    const query = `SELECT * FROM transactions WHERE id = '${transactionId}'`;

    // BAD: No amount validation
    const refund = {
      transactionId,
      amount,
      timestamp: Date.now()
    };

    return refund;
  }

  /**
   * Export transaction data - data leak vulnerability
   */
  exportTransactions(format) {
    // BAD: Command injection vulnerability
    const exec = require('child_process').exec;
    exec(`cat transactions.csv | grep ${format}`, (error, stdout) => {
      return stdout;
    });

    // BAD: Exposing all customer data
    return {
      transactions: this.creditCardNumbers,
      customers: this.customerData
    };
  }

  /**
   * Calculate fees - precision errors
   */
  calculateFees(amount) {
    // BAD: Using floating point for money calculations
    const fee = amount * 0.029 + 0.30;
    const netAmount = amount - fee;

    // BAD: No rounding or precision handling
    return {
      fee,
      netAmount
    };
  }
}

// BAD: Singleton pattern exposing instance globally
const paymentProcessor = new PaymentProcessor();

// BAD: Exposing internal methods
module.exports = {
  processor: paymentProcessor,
  STRIPE_KEY,
  WEBHOOK_SECRET
};