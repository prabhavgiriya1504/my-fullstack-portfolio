// client/components/AnimationWrapper.jsx
'use client';

import { motion } from 'framer-motion';

export default function AnimationWrapper({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}