import React from 'react';

const SecurityFeatures = ({ features }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200/50">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <feature.icon className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{feature.title}</p>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecurityFeatures;