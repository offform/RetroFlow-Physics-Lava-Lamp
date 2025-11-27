import React, { useMemo } from 'react';
import { BlobConfig } from '../types';

interface LavaLampBlobProps {
  config: BlobConfig;
  containerHeight: number;
  speed: number;
}

const LavaLampBlob: React.FC<LavaLampBlobProps> = ({ config, containerHeight, speed }) => {
  
  const animationName = useMemo(() => `float-${config.id}`, [config.id]);
  
  // 锚点位置
  const baseY = 380; 
  const topY = 120;

  // 行为分类
  // 0-4: 上升 (Risers)
  // 5-7: 下沉 (Droppers)
  // 8-9: 悬浮 (Floaters)
  let keyframes = '';
  
  // 默认只播一次 (forwards)，但我们在 style 里设了 infinite，
  // 所以它会无线循环播放：出生->死亡->重生
  // 注意：这里千万不能用 alternate，否则就会变成 "上去又原路退回来"，很难看
  
  if (config.id <= 4) {
    // 🔥 上升组：从底部母体分离，升到顶部母体融合
    keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateY(${baseY}px) scale(1.0, 0.8); opacity: 0; }
        10% { transform: translateY(${baseY}px) scale(1.2, 0.8); opacity: 1; } /* 现身 */
        30% { transform: translateY(${baseY - 60}px) scale(0.8, 1.2); } /* 拉丝脱离 */
        70% { transform: translateY(${topY + 60}px) scale(1.0, 1.0); } /* 恢复 */
        90% { transform: translateY(${topY}px) scale(1.2, 0.8); opacity: 1; } /* 撞顶变扁 */
        100% { transform: translateY(${topY - 10}px) scale(0.5, 0.5); opacity: 0; } /* 融入消失 */
      }
    `;
  } else if (config.id <= 7) {
    // 🔥 下沉组：从顶部滴落
    keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateY(${topY}px) scale(1.0, 0.8); opacity: 0; }
        10% { transform: translateY(${topY}px) scale(1.1, 0.9); opacity: 1; }
        30% { transform: translateY(${topY + 50}px) scale(0.8, 1.2); } /* 水滴状下落 */
        80% { transform: translateY(${baseY - 40}px) scale(1.0, 1.0); }
        100% { transform: translateY(${baseY}px) scale(1.4, 0.6); opacity: 0; } /* 拍在底座上 */
      }
    `;
  } else {
    // 🔥 悬浮组：在中间游荡，假装是没劲儿了
    keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateY(250px) scale(0.9, 1.1); }
        50% { transform: translateY(280px) scale(1.1, 0.9); }
        100% { transform: translateY(250px) scale(0.9, 1.1); }
      }
    `;
  }

  const speedFactor = 0.35;
  const safeSpeed = Math.max(0.01, speed * speedFactor);
  const adjustedDuration = config.duration / safeSpeed;

  return (
    <>
      <style>
        {keyframes}
      </style>
      <circle
        cx={`${config.x}%`}
        cy="0" 
        r={config.size}
        fill="url(#waxGradient)"
        style={{
          // 关键：这里移除了 alternate！变成单向循环。
          animation: `${animationName} ${adjustedDuration}s ease-in-out infinite`,
          animationDelay: `-${config.delay}s`, 
          opacity: config.opacity,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      />
    </>
  );
};

export default LavaLampBlob;