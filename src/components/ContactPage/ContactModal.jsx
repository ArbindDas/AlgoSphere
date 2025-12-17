// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Send, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';
// import { subjectOptions } from '../../components/utils/constants';

// const ContactModal = ({ isOpen, onClose }) => {
//   const [formState, setFormState] = useState({ 
//     name: '', 
//     email: '', 
//     phone: '', 
//     orderNumber: '',
//     subject: 'order',
//     message: '' 
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formState.name || !formState.email || !formState.message) return;
    
//     setIsSubmitting(true);
    
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setIsSubmitting(false);
//       setSubmitSuccess(true);
      
//       setTimeout(() => {
//         setSubmitSuccess(false);
//         onClose();
//         setFormState({ 
//           name: '', 
//           email: '', 
//           phone: '', 
//           orderNumber: '',
//           subject: 'order',
//           message: '' 
//         });
//       }, 3000);
//     } catch (error) {
//       console.error('Error:', error);
//       setIsSubmitting(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormState({ ...formState, [e.target.name]: e.target.value });
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => !isSubmitting && onClose()}
//         className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/50 backdrop-blur-sm"
//         >
//           {/* Modal content from original component */}
//           {/* ... (rest of modal code) ... */}
//             {/* Enhanced Contact Modal */}
//                 <AnimatePresence>
//                   {isModalOpen && (
//                     <>
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={() => !isSubmitting && setIsModalOpen(false)}
//                         className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
//                       >
//                         <motion.div
//                           initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                           animate={{ opacity: 1, scale: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                           onClick={(e) => e.stopPropagation()}
//                           className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/50 backdrop-blur-sm"
//                         >
//                           <div className="sticky top-0 bg-linear-to-r from-white via-white/95 to-white border-b border-gray-200/50 px-8 py-6 flex items-center justify-between rounded-t-3xl backdrop-blur-sm">
//                             <div>
//                               <h2 className="text-2xl font-bold text-gray-900">Shopping Support Request</h2>
//                               <p className="text-gray-600 text-sm mt-1">Include your order number for faster help</p>
//                             </div>
//                             <button
//                               onClick={() => !isSubmitting && setIsModalOpen(false)}
//                               className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
//                               disabled={isSubmitting}
//                             >
//                               <X className="w-5 h-5 text-gray-600" />
//                             </button>
//                           </div>
          
//                           <div className="p-8">
//                             {submitSuccess ? (
//                               <motion.div
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="text-center py-12"
//                               >
//                                 <div className="relative">
//                                   <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-pulse" />
//                                   <div className="relative bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                                     <CheckCircle className="w-12 h-12 text-green-600" />
//                                   </div>
//                                 </div>
//                                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
//                                 <p className="text-gray-600 mb-4">We'll contact you within 1 hour to help with your shopping inquiry.</p>
//                                 <p className="text-sm text-gray-500">Check your email for confirmation and tracking info</p>
//                               </motion.div>
//                             ) : (
//                               <form onSubmit={handleSubmit} className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                   <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                       Full Name *
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="name"
//                                       value={formState.name}
//                                       onChange={handleChange}
//                                       required
//                                       className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
//                                       placeholder="Your name"
//                                     />
//                                   </div>
          
//                                   <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                       Email Address *
//                                     </label>
//                                     <input
//                                       type="email"
//                                       name="email"
//                                       value={formState.email}
//                                       onChange={handleChange}
//                                       required
//                                       className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
//                                       placeholder="you@example.com"
//                                     />
//                                   </div>
//                                 </div>
          
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                   <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                       Phone Number
//                                     </label>
//                                     <input
//                                       type="tel"
//                                       name="phone"
//                                       value={formState.phone}
//                                       onChange={handleChange}
//                                       className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
//                                       placeholder="Optional for urgent issues"
//                                     />
//                                   </div>
          
//                                   <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                       Order Number
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="orderNumber"
//                                       value={formState.orderNumber}
//                                       onChange={handleChange}
//                                       className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
//                                       placeholder="ORD-XXXX-XXXX (if applicable)"
//                                     />
//                                   </div>
//                                 </div>
          
//                                 <div>
//                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     What do you need help with? *
//                                   </label>
//                                   <div className="flex flex-wrap gap-2 mb-4">
//                                     {subjectOptions.map((option) => (
//                                       <button
//                                         key={option.value}
//                                         type="button"
//                                         onClick={() => setFormState({ ...formState, subject: option.value })}
//                                         className={`px-4 py-2 rounded-lg transition-all ${formState.subject === option.value 
//                                           ? 'bg-linear-to-r from-emerald-600 to-green-500 text-white shadow-md' 
//                                           : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-300/50'}`}
//                                       >
//                                         {option.label}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 </div>
          
//                                 <div>
//                                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Details *
//                                   </label>
//                                   <textarea
//                                     name="message"
//                                     value={formState.message}
//                                     onChange={handleChange}
//                                     required
//                                     rows={6}
//                                     className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm resize-none"
//                                     placeholder="Please describe your issue or question. Include order details, product information, and any error messages you received..."
//                                   />
//                                 </div>
          
//                                 <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-200/50">
//                                   <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
//                                   <p className="text-sm text-blue-700">
//                                     Your information is protected with 256-bit SSL encryption. We'll only use it to help with your shopping inquiry.
//                                   </p>
//                                 </div>
          
//                                 <motion.button
//                                   type="submit"
//                                   disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
//                                   whileHover={{ scale: 1.02 }}
//                                   whileTap={{ scale: 0.98 }}
//                                   className="w-full bg-linear-to-r from-emerald-600 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
//                                 >
//                                   <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                                   {isSubmitting ? (
//                                     <>
//                                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                       Submitting...
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Send className="w-5 h-5 relative z-10" />
//                                       <span className="relative z-10">Send Request</span>
//                                       <ChevronRight className="w-5 h-5 relative z-10" />
//                                     </>
//                                   )}
//                                 </motion.button>
          
//                                 <div className="text-center pt-4 border-t border-gray-200/50">
//                                   <p className="text-xs text-gray-500">
//                                     Need immediate help? Call our 24/7 hotline: <span className="font-semibold text-emerald-600">+1 (800) 123-SHOP</span>
//                                   </p>
//                                 </div>
//                               </form>
//                             )}
//                           </div>
//                         </motion.div>
//                       </motion.div>
//                     </>
//                   )}
//                 </AnimatePresence>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ContactModal;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronRight, CheckCircle, ShieldCheck } from 'lucide-react';
// import { subjectOptions } from '../../utils/constants';

import { subjectOptions } from '../../components/utils/constants';

const ContactModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    orderNumber: '',
    subject: 'order',
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        setFormState({ 
          name: '', 
          email: '', 
          phone: '', 
          orderNumber: '',
          subject: 'order',
          message: '' 
        });
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && onClose()}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-linear-to-br from-white via-emerald-50/30 to-green-50/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/50 backdrop-blur-sm"
          >
            <div className="sticky top-0 bg-linear-to-r from-white via-white/95 to-white border-b border-gray-200/50 px-8 py-6 flex items-center justify-between rounded-t-3xl backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Shopping Support Request</h2>
                <p className="text-gray-600 text-sm mt-1">Include your order number for faster help</p>
              </div>
              <button
                onClick={() => !isSubmitting && onClose()}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-full blur-xl opacity-20 animate-pulse" />
                    <div className="relative bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                  <p className="text-gray-600 mb-4">We'll contact you within 1 hour to help with your shopping inquiry.</p>
                  <p className="text-sm text-gray-500">Check your email for confirmation and tracking info</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                        placeholder="Optional for urgent issues"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Order Number
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        value={formState.orderNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm"
                        placeholder="ORD-XXXX-XXXX (if applicable)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What do you need help with? *
                    </label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subjectOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormState({ ...formState, subject: option.value })}
                          className={`px-4 py-2 rounded-lg transition-all ${formState.subject === option.value 
                            ? 'bg-linear-to-r from-emerald-600 to-green-500 text-white shadow-md' 
                            : 'bg-white/80 text-gray-700 hover:bg-gray-100 border border-gray-300/50'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Details *
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900 backdrop-blur-sm resize-none"
                      placeholder="Please describe your issue or question. Include order details, product information, and any error messages you received..."
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-200/50">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-sm text-blue-700">
                      Your information is protected with 256-bit SSL encryption. We'll only use it to help with your shopping inquiry.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-linear-to-r from-emerald-600 to-green-500 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Send Request</span>
                        <ChevronRight className="w-5 h-5 relative z-10" />
                      </>
                    )}
                  </motion.button>

                  <div className="text-center pt-4 border-t border-gray-200/50">
                    <p className="text-xs text-gray-500">
                      Need immediate help? Call our 24/7 hotline: <span className="font-semibold text-emerald-600">+1 (800) 123-SHOP</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;