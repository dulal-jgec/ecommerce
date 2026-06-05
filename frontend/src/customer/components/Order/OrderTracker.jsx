// OrderTracker.jsx
import React from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon,
  ArchiveBoxIcon,
  HomeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const OrderTracker = ({ timeline, currentStatus }) => {
  // Map status to icon
  const getStatusIcon = (status, isCompleted) => {
    if (isCompleted) return CheckCircleIcon;
    
    const icons = {
      'Order Placed': ArchiveBoxIcon,
      'Processing': ClockIcon,
      'Shipped': TruckIcon,
      'Out for Delivery': MapPinIcon,
      'Delivered': HomeIcon,
    };
    return icons[status] || ClockIcon;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCurrentStepIndex = () => {
    return timeline.findIndex(step => step.completed === false) - 1;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Tracking</h2>
      
      {/* Desktop Timeline */}
      <div className="hidden sm:block relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((getCurrentStepIndex() + 1) / (timeline.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {timeline.map((step, idx) => {
            const Icon = getStatusIcon(step.status, step.completed);
            const isCompleted = step.completed;
            const isCurrent = idx === getCurrentStepIndex() + 1;
            
            return (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                    : isCurrent
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 scale-110'
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-center">
                  <p className={`
                    text-sm font-semibold
                    ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    {step.status}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(step.date)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 max-w-[120px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline - Vertical */}
      <div className="sm:hidden space-y-6">
        {timeline.map((step, idx) => {
          const Icon = getStatusIcon(step.status, step.completed);
          const isCompleted = step.completed;
          const isCurrent = idx === getCurrentStepIndex() + 1;
          
          return (
            <div key={idx} className="relative flex gap-4">
              {/* Vertical Line */}
              {idx < timeline.length - 1 && (
                <div className={`
                  absolute left-5 top-10 w-0.5 h-16
                  ${isCompleted ? 'bg-emerald-500' : 'bg-gray-200'}
                `} />
              )}
              
              {/* Icon */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 z-10
                ${isCompleted 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                  : isCurrent
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-200 scale-110'
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                <Icon className="h-5 w-5" />
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className={`
                    font-semibold
                    ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    {step.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(step.date)}
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Progress Bar */}
      {currentStatus !== 'delivered' && currentStatus !== 'cancelled' && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Estimated Delivery</span>
            <span className="font-semibold text-gray-900">
              {formatDate(timeline.find(t => t.status === 'Delivered')?.date || timeline[timeline.length - 1]?.date)}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${((getCurrentStepIndex() + 1) / (timeline.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="mt-6 flex justify-center">
        <div className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          ${currentStatus === 'delivered' && 'bg-emerald-100 text-emerald-700'}
          ${currentStatus === 'shipped' && 'bg-blue-100 text-blue-700'}
          ${currentStatus === 'processing' && 'bg-amber-100 text-amber-700'}
        `}>
          {currentStatus === 'delivered' && <CheckCircleIcon className="h-4 w-4" />}
          {currentStatus === 'shipped' && <TruckIcon className="h-4 w-4" />}
          {currentStatus === 'processing' && <ClockIcon className="h-4 w-4" />}
          Order {currentStatus === 'delivered' ? 'Completed' : currentStatus === 'shipped' ? 'In Transit' : 'Being Processed'}
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;