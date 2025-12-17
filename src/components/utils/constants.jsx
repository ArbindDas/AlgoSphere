
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
    badge: 'Fast',
    badgeColor: {
      light: 'bg-emerald-100 text-emerald-800',
      dark: 'bg-emerald-900/30 text-emerald-300 border border-emerald-800/50'
    }
  },
  { 
    icon: Phone, 
    title: '24/7 Customer Care', 
    value: '+1 (800) 123-SHOP',
    description: 'Direct line for urgent order issues',
    color: 'from-blue-500 to-cyan-600',
    stats: 'Available now',
    badge: 'Live',
    badgeColor: {
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-900/30 text-blue-300 border border-blue-800/50'
    }
  },
  { 
    icon: MessageCircle, 
    title: 'Live Chat', 
    value: 'Chat Now',
    description: 'Instant help with your purchase',
    color: 'from-purple-500 to-pink-600',
    stats: 'Avg wait: 1min',
    badge: 'Instant',
    badgeColor: {
      light: 'bg-purple-100 text-purple-800',
      dark: 'bg-purple-900/30 text-purple-300 border border-purple-800/50'
    }
  },
  { 
    icon: ShieldCheck, 
    title: 'Security Help', 
    value: 'security@shopsecure.com',
    description: 'Payment security & account protection',
    color: 'from-orange-500 to-amber-500',
    stats: '24/7 Monitoring',
    badge: 'Secure',
    badgeColor: {
      light: 'bg-orange-100 text-orange-800',
      dark: 'bg-orange-900/30 text-orange-300 border border-orange-800/50'
    }
  }
];

export const faqItems = [
  {
    question: "How can I track my order?",
    answer: "Use your order number in the tracking section or chat with our support team for real-time updates.",
    icon: Package,
    bgColor: {
      light: 'bg-blue-50',
      dark: 'bg-blue-900/20'
    },
    iconColor: {
      light: 'text-blue-600',
      dark: 'text-blue-400'
    }
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay.",
    icon: CreditCard,
    bgColor: {
      light: 'bg-green-50',
      dark: 'bg-green-900/20'
    },
    iconColor: {
      light: 'text-green-600',
      dark: 'text-green-400'
    }
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes! We use 256-bit SSL encryption and are PCI-DSS compliant. We never store your full card details.",
    icon: Lock,
    bgColor: {
      light: 'bg-red-50',
      dark: 'bg-red-900/20'
    },
    iconColor: {
      light: 'text-red-600',
      dark: 'text-red-400'
    }
  },
  {
    question: "What is your return policy?",
    answer: "30-day hassle-free returns. Items must be unused with original packaging. Free return shipping.",
    icon: RefreshCw,
    bgColor: {
      light: 'bg-purple-50',
      dark: 'bg-purple-900/20'
    },
    iconColor: {
      light: 'text-purple-600',
      dark: 'text-purple-400'
    }
  }
];

export const securityFeatures = [
  { 
    icon: Shield, 
    title: 'SSL Encryption', 
    desc: 'Bank-level security',
    bgColor: {
      light: 'bg-gray-100',
      dark: 'bg-gray-800'
    },
    iconColor: {
      light: 'text-blue-600',
      dark: 'text-blue-400'
    }
  },
  { 
    icon: Lock, 
    title: 'PCI Compliance', 
    desc: 'Secure payment processing',
    bgColor: {
      light: 'bg-gray-100',
      dark: 'bg-gray-800'
    },
    iconColor: {
      light: 'text-green-600',
      dark: 'text-green-400'
    }
  },
  { 
    icon: ThumbsUp, 
    title: 'Buyer Protection', 
    desc: '30-day guarantee',
    bgColor: {
      light: 'bg-gray-100',
      dark: 'bg-gray-800'
    },
    iconColor: {
      light: 'text-purple-600',
      dark: 'text-purple-400'
    }
  },
  { 
    icon: Store, 
    title: 'Verified Store', 
    desc: 'Trusted merchant',
    bgColor: {
      light: 'bg-gray-100',
      dark: 'bg-gray-800'
    },
    iconColor: {
      light: 'text-orange-600',
      dark: 'text-orange-400'
    }
  }
];

export const subjectOptions = [
  { value: 'order', label: 'Order Issues' },
  { value: 'shipping', label: 'Shipping & Delivery' },
  { value: 'returns', label: 'Returns & Refunds' },
  { value: 'payment', label: 'Payment Problems' },
  { value: 'account', label: 'Account Security' }
];