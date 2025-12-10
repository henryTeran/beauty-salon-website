import { motion } from 'framer-motion';

export default function LotusBackground() {
  return (
    <motion.div
      className="lotus-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.04 }}
      transition={{ duration: 2 }}
    >
      <svg
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g opacity="1">
          <path
            d="M400 400C400 450 380 500 350 540C370 520 390 490 400 450C410 490 430 520 450 540C420 500 400 450 400 400Z"
            fill="url(#lotus-gradient-1)"
            className="animate-lotus-pulse"
          />

          <path
            d="M400 400C400 350 420 300 450 260C430 280 410 310 400 350C390 310 370 280 350 260C380 300 400 350 400 400Z"
            fill="url(#lotus-gradient-2)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '0.5s' }}
          />

          <path
            d="M400 400C450 400 500 420 540 450C520 430 490 410 450 400C490 390 520 370 540 350C500 380 450 400 400 400Z"
            fill="url(#lotus-gradient-3)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '1s' }}
          />

          <path
            d="M400 400C350 400 300 380 260 350C280 370 310 390 350 400C310 410 280 430 260 450C300 420 350 400 400 400Z"
            fill="url(#lotus-gradient-4)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '1.5s' }}
          />

          <path
            d="M400 400C440 360 480 330 520 310C490 330 460 360 430 390C450 360 480 340 510 330C470 350 430 380 400 400Z"
            fill="url(#lotus-gradient-5)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '2s' }}
          />

          <path
            d="M400 400C360 360 330 320 310 280C330 310 360 340 390 370C360 350 340 320 330 290C350 330 380 370 400 400Z"
            fill="url(#lotus-gradient-6)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '2.5s' }}
          />

          <path
            d="M400 400C360 440 330 480 310 520C330 490 360 460 390 430C360 450 340 480 330 510C350 470 380 430 400 400Z"
            fill="url(#lotus-gradient-7)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '3s' }}
          />

          <path
            d="M400 400C440 440 480 470 520 490C490 470 460 440 430 410C450 440 480 460 510 470C470 450 430 420 400 400Z"
            fill="url(#lotus-gradient-8)"
            className="animate-lotus-pulse"
            style={{ animationDelay: '3.5s' }}
          />

          <circle cx="400" cy="400" r="40" fill="url(#lotus-center)" />
        </g>

        <defs>
          <linearGradient id="lotus-gradient-1" x1="400" y1="400" x2="400" y2="540">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-2" x1="400" y1="400" x2="400" y2="260">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-3" x1="400" y1="400" x2="540" y2="400">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-4" x1="400" y1="400" x2="260" y2="400">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-5" x1="400" y1="400" x2="520" y2="310">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-6" x1="400" y1="400" x2="310" y2="280">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-7" x1="400" y1="400" x2="310" y2="520">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="lotus-gradient-8" x1="400" y1="400" x2="520" y2="490">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4E5C2" stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="lotus-center">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#B8941F" stopOpacity="0.8" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
