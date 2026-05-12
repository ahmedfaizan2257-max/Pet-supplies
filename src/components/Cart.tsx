import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Gift, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Checkout detail inputs state
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');

  const FREE_SHIPPING_LIMIT = 49;
  const STANDARD_SHIPPING_COST = 9.95;

  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const qualifiesForFreeShipping = itemsSubtotal >= FREE_SHIPPING_LIMIT;
  const remainingForFreeShipping = FREE_SHIPPING_LIMIT - itemsSubtotal;
  const shippingFee = itemsSubtotal === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const finalTotal = itemsSubtotal + shippingFee;

  const triggerCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    setIsCheckingOut(false);
  };

  const handleResetCartState = () => {
    onClearCart();
    setOrderCompleted(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex justify-end"
          id="cart-overlay-backdrop"
        >
          {/* Main Drawer Container */}
          <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-md bg-[#FFFDF7] h-full shadow-2xl flex flex-col justify-between border-l border-gray-150"
            id="cart-drawer-container"
          >
            {/* Header section styled with theme colors */}
            <div className="bg-[#2B2D42] text-white p-5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#FF9F1C]" />
                <div>
                  <h3 className="font-display font-black text-base tracking-tight">Shopping Cart</h3>
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} &bull; AUD checkout
                  </p>
                </div>
              </div>
              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-1.5 rounded-full transition text-gray-400 hover:text-white cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content viewport */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-140px)]">
              
              {/* Order completion modal/overlay overlay view wrapper */}
              {orderCompleted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-6 flex flex-col items-center justify-center h-full"
                >
                  <CheckCircle className="w-16 h-16 text-[#2EC4B6] mb-4 animate-bounce" />
                  <h3 className="text-xl font-black text-[#2B2D42] mb-2">Order Confirmed, Mate!</h3>
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    Thank you {fullName || 'customer'}! Your premium selection has been registered with our Sydney supply hub. We&apos;ve sent a summary to your email.
                  </p>
                  <div className="bg-white rounded-xl p-3 border border-gray-200 text-xs font-mono text-[#2B2D42]/85 text-left mb-8 w-full">
                    <p className="border-b border-gray-100 pb-1.5 mb-1.5 font-bold text-[#FF9F1C]">📦 SHIPPING TO:</p>
                    <p className="truncate">Name: {fullName}</p>
                    <p className="truncate">Address: {address}</p>
                    <p className="mt-1.5 pt-1.5 border-t border-gray-100 flex justify-between font-bold text-[#2B2D42]">
                      <span>Paid Total:</span>
                      <span>${finalTotal.toFixed(2)} AUD</span>
                    </p>
                  </div>
                  <button
                    onClick={handleResetCartState}
                    className="w-full bg-[#FF9F1C] hover:bg-[#e08910] text-white py-3.5 rounded-xl font-black text-md transition-all shadow-md cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : isCheckingOut ? (
                /* Interactive Checkout Screen */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5"
                >
                  <div className="bg-[#CBF3F0] p-4 rounded-2xl flex items-start gap-3">
                    <Gift className="w-5 h-5 text-[#2EC4B6] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-[#2B2D42]">Aussie Premium Assembly</h4>
                      <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                        Our fulfillment team coordinates temperature-sensitive bubble wrapping for electronics and sanitized custom boxes for orthopedic fabrics.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <h4 className="font-display font-black text-sm text-[#2B2D42] uppercase tracking-wider border-b border-gray-200 pb-2">Shipping Information</h4>
                    <div>
                      <label className="block text-xs font-black uppercase text-[#2B2D42] mb-1.5 tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Douglas Mawson"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#FF9F1C] rounded-xl py-2 px-3 text-xs font-bold leading-normal focus:outline-none transition-all text-[#2B2D42]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-[#2B2D42] mb-1.5 tracking-wider">Postal Address (Australia)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 50 George St, Sydney NSW 2000"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-white border-2 border-gray-200 focus:border-[#FF9F1C] rounded-xl py-2 px-3 text-xs font-bold leading-normal focus:outline-none transition-all text-[#2B2D42]"
                      />
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4 space-y-2.5">
                      <h4 className="font-extrabold text-xs text-[#2B2D42] uppercase tracking-wider mb-2">Invoice Summary</h4>
                      <div className="flex justify-between text-xs font-medium text-gray-650">
                        <span>Items Subtotal:</span>
                        <span>${itemsSubtotal.toFixed(2)} AUD</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-gray-650">
                        <span>Fulfillment & Delivery:</span>
                        <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-sm text-[#2B2D42]">
                        <span>Grand Total:</span>
                        <span>${finalTotal.toFixed(2)} AUD</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCheckingOut(false)}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-600 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                      >
                        Back to Items
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#2EC4B6] hover:bg-[#25ab9e] text-white font-black text-xs py-3 rounded-xl shadow-md transition cursor-pointer"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <span className="text-6xl animate-pulse">🛒</span>
                  <h3 className="font-display font-black text-lg text-[#2B2D42]">Your Cart is Empty</h3>
                  <p className="text-xs text-gray-550 max-w-[240px] leading-relaxed mx-auto">
                    Explore our premium, newly revamped dog calming collars or interactive turtle docks to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#2EC4B6] text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer"
                  >
                    Go Exploring
                  </button>
                </div>
              ) : (
                /* Populated Items Screen */
                <div className="space-y-4">
                  
                  {/* Dynamic Progress for Free Delivery promotion countdown */}
                  <div className="bg-[#FFFDF7] border-2 border-dashed border-[#FF9F1C] rounded-2.5xl p-3.5 flex items-center justify-between shadow-xs">
                    <span className="text-lg">🚚</span>
                    <div className="flex-1 ml-3 min-w-0">
                      {qualifiesForFreeShipping ? (
                        <div>
                          <h4 className="font-black text-xs text-[#2EC4B6] leading-none">Free Shipping Activated!</h4>
                          <p className="text-[10px] text-gray-500 mt-0.5">Your order qualifies for complimentary dispatch</p>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-black text-xs text-[#2B2D42] leading-none">
                            Only <span className="text-[#FF9F1C]">${remainingForFreeShipping.toFixed(2)} AUD</span> away
                          </h4>
                          <p className="text-[10px] text-gray-500 mt-0.5">Add premium items to avoid standard $9.95 postage fee.</p>
                        </div>
                      )}
                      
                      {/* Interactive bar */}
                      <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#FF9F1C] to-[#2EC4B6] transition-all duration-300" 
                          style={{ width: `${Math.min(100, (itemsSubtotal / FREE_SHIPPING_LIMIT) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Scrolling Cart Cards */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div 
                        key={item.product.id}
                        className="bg-white rounded-2xl p-3 border border-gray-150 flex gap-3 shadow-xs hover:border-[#FF9F1C] transition duration-200"
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.product.id}/300/300`;
                          }}
                        />
                        
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-xs text-[#2B2D42] truncate leading-tight">{item.product.name}</h4>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">{item.product.sku}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#2B2D42]">${(item.product.price * item.quantity).toFixed(2)}</span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-[#2B2D42] text-xs font-black"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black text-[#2B2D42] w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-[#2B2D42] text-xs font-black"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Trash */}
                        <div className="self-center">
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>

            {/* Bottom summary block */}
            {!orderCompleted && !isCheckingOut && cartItems.length > 0 && (
              <div className="border-t border-gray-150 p-4 bg-white space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500 font-bold">
                    <span>Products Subtotal:</span>
                    <span>${itemsSubtotal.toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-bold">
                    <span>Fulfillment Postage:</span>
                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#2B2D42] pt-2 border-t border-gray-100">
                    <span>Grand Total:</span>
                    <span>${finalTotal.toFixed(2)} AUD</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={triggerCheckout}
                    className="w-full bg-[#FF9F1C] hover:bg-[#e08910] text-white py-3.5 rounded-2xl font-black text-md transition-all shadow-lg flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Secure Aussie Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
