import { 
  ShoppingBag, Phone, MessageCircle, ShieldCheck, 
  Package, CreditCard, Lock, RefreshCw,
  Shield, ThumbsUp, Store, Gift, Users, CheckCircle, Clock
} from 'lucide-react';

export const contactCards = [
  { 
    icon: ShoppingBag, 
    title: 'Order Support', 
    value: 'orders@shopsecure.com',
    description: 'Help with orders, tracking, and delivery',
    color: 'from-emerald-500 to-green-600',
    stats: 'Response time: 1h',
    badge: 'Fast'
  },
  { 
    icon: Phone, 
    title: '24/7 Customer Care', 
    value: '+1 (800) 123-SHOP',
    description: 'Direct line for urgent order issues',
    color: 'from-blue-500 to-cyan-600',
    stats: 'Available now',
    badge: 'Live'
  },
  { 
    icon: MessageCircle, 
    title: 'Live Chat', 
    value: 'Chat Now',
    description: 'Instant help with your purchase',
    color: 'from-purple-500 to-pink-600',
    stats: 'Avg wait: 1min',
    badge: 'Instant'
  },
  { 
    icon: ShieldCheck, 
    title: 'Security Help', 
    value: 'security@shopsecure.com',
    description: 'Payment security & account protection',
    color: 'from-orange-500 to-amber-500',
    stats: '24/7 Monitoring',
    badge: 'Secure'
  }
];

export const faqItems = [
  {
    question: "How can I track my order?",
    answer: "Use your order number in the tracking section or chat with our support team for real-time updates.",
    icon: Package
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay.",
    icon: CreditCard
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes! We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details.",
    icon: Lock
  },
  {
    question: "What is your return policy?",
    answer: "30-day hassle-free returns. Items must be unused with original packaging. Free return shipping.",
    icon: RefreshCw
  }
];

export const securityFeatures = [
  { icon: Shield, title: 'SSL Encryption', desc: 'Bank-level security' },
  { icon: Lock, title: 'PCI Compliance', desc: 'Secure payment processing' },
  { icon: ThumbsUp, title: 'Buyer Protection', desc: '30-day guarantee' },
  { icon: Store, title: 'Verified Store', desc: 'Trusted merchant' }
];

export const subjectOptions = [
  { value: 'order', label: 'Order Issues' },
  { value: 'shipping', label: 'Shipping & Delivery' },
  { value: 'returns', label: 'Returns & Refunds' },
  { value: 'payment', label: 'Payment Problems' },
  { value: 'account', label: 'Account Security' }
];