import React, { useState } from 'react';
import { X, Share2, Lock, Unlock, ChevronRight } from 'lucide-react';

const MatrixProgressionMap = () => {
  const [currentPoints, setCurrentPoints] = useState(208);
  
  const ranks = [
    {
      id: 1,
      name: 'Silver Pawn',
      points: 50,
      reward: 'Unlock 5 New Lessons',
      icon: '♙',
      unlocked: true,
      completed: true
    },
    {
      id: 2,
      name: 'Silver Knight',
      points: 100,
      reward: 'Unlock Friend Requests',
      icon: '♘',
      unlocked: true,
      completed: true
    },
    {
      id: 3,
      name: 'Silver Bishop',
      points: 200,
      reward: 'Unlock Campus Chat Access',
      icon: '♗',
      unlocked: true,
      completed: true
    },
    {
      id: 4,
      name: 'Silver Rook',
      points: 400,
      reward: 'Unlock Weekly Challenges',
      icon: '♖',
      unlocked: false,
      completed: false
    },
    {
      id: 5,
      name: 'Silver Queen',
      points: 800,
      reward: 'Unlock Exclusive Mentor Sessions',
      icon: '♕',
      unlocked: false,
      completed: false
    },
    {
      id: 6,
      name: 'Silver King',
      points: 1500,
      reward: 'Unlock All Premium Features',
      icon: '♔',
      unlocked: false,
      completed: false
    }
  ];

  const nextRank = ranks.find(rank => !rank.completed);
  const pointsToNext = nextRank ? nextRank.points - currentPoints : 0;

  const styles = {
    container: {
      backgroundColor: '#0a0e17',
      minHeight: '100vh',
      color: '#00ff41',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    matrixBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.03,
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff41 2px, #00ff41 4px)',
      pointerEvents: 'none',
    },
    header: {
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0, 255, 65, 0.2)',
      position: 'relative',
      zIndex: 10,
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#00ff41',
      textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
      fontFamily: 'monospace',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
    },
    statsCard: {
      background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)',
      padding: '24px',
      margin: '20px',
      borderRadius: '12px',
      border: '2px solid rgba(0, 255, 65, 0.3)',
      boxShadow: '0 0 20px rgba(0, 255, 65, 0.2), inset 0 0 20px rgba(0, 255, 65, 0.05)',
      position: 'relative',
      zIndex: 10,
    },
    statsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    statsLeft: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    currentRankLabel: {
      fontSize: '14px',
      color: '#00ff41',
      opacity: 0.7,
      fontFamily: 'monospace',
    },
    currentRank: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#00ff41',
      textShadow: '0 0 20px rgba(0, 255, 65, 0.8)',
    },
    pointsDisplay: {
      fontSize: '18px',
      color: '#00ff41',
      fontFamily: 'monospace',
    },
    rankAvatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%)',
      border: '3px solid #00ff41',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '40px',
      boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)',
    },
    shareButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 255, 65, 0.3)',
      borderRadius: '8px',
      color: '#00ff41',
      cursor: 'pointer',
      marginTop: '12px',
      transition: 'all 0.3s ease',
    },
    progressSection: {
      padding: '20px',
      position: 'relative',
      zIndex: 10,
    },
    pathContainer: {
      position: 'relative',
      paddingTop: '40px',
    },
    svgPath: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
    rankNode: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '60px',
      position: 'relative',
      zIndex: 2,
    },
    rankNodeLeft: {
      justifyContent: 'flex-start',
    },
    rankNodeRight: {
      justifyContent: 'flex-end',
      flexDirection: 'row-reverse',
    },
    rankCircle: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      flexShrink: 0,
      position: 'relative',
    },
    rankCircleUnlocked: {
      background: 'radial-gradient(circle, rgba(0, 255, 65, 0.3) 0%, rgba(0, 0, 0, 0.9) 100%)',
      border: '3px solid #00ff41',
      boxShadow: '0 0 30px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.2)',
    },
    rankCircleLocked: {
      background: 'radial-gradient(circle, rgba(100, 100, 100, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%)',
      border: '3px solid rgba(100, 100, 100, 0.3)',
      boxShadow: '0 0 10px rgba(100, 100, 100, 0.2)',
    },
    rankInfo: {
      marginLeft: '20px',
      marginRight: '20px',
      flex: 1,
    },
    rankInfoRight: {
      textAlign: 'right',
    },
    rankName: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
      fontFamily: 'monospace',
    },
    rankNameUnlocked: {
      color: '#00ff41',
      textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
    },
    rankNameLocked: {
      color: '#646464',
    },
    rankPoints: {
      fontSize: '16px',
      fontFamily: 'monospace',
    },
    rankPointsUnlocked: {
      color: '#00ff41',
      opacity: 0.8,
    },
    rankPointsLocked: {
      color: '#646464',
      opacity: 0.6,
    },
    rankReward: {
      fontSize: '14px',
      marginTop: '8px',
      padding: '6px 12px',
      borderRadius: '6px',
      display: 'inline-block',
      fontFamily: 'monospace',
    },
    rankRewardUnlocked: {
      backgroundColor: 'rgba(0, 255, 65, 0.1)',
      color: '#00ff41',
      border: '1px solid rgba(0, 255, 65, 0.3)',
    },
    rankRewardLocked: {
      backgroundColor: 'rgba(100, 100, 100, 0.1)',
      color: '#646464',
      border: '1px solid rgba(100, 100, 100, 0.3)',
    },
    statusBadge: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 15px rgba(0, 255, 65, 0.6)',
    },
    statusBadgeUnlocked: {
      backgroundColor: '#00ff41',
      border: '2px solid #0a0e17',
    },
    statusBadgeLocked: {
      backgroundColor: '#646464',
      border: '2px solid #0a0e17',
    },
    nextRankCard: {
      margin: '20px',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)',
      border: '2px solid rgba(0, 255, 65, 0.2)',
      borderRadius: '12px',
      position: 'relative',
      zIndex: 10,
    },
    nextRankTitle: {
      fontSize: '16px',
      color: '#00ff41',
      marginBottom: '12px',
      fontFamily: 'monospace',
      opacity: 0.8,
    },
    nextRankInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nextRankName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#00ff41',
      fontFamily: 'monospace',
    },
    pointsNeeded: {
      fontSize: '18px',
      color: '#00ff41',
      fontFamily: 'monospace',
      opacity: 0.9,
    },
  };

  const renderPath = () => {
    const pathPoints = [];
    const baseX = 50;
    const startY = 100;
    const verticalSpacing = 160;

    for (let i = 0; i < ranks.length; i++) {
      const y = startY + i * verticalSpacing;
      const x = i % 2 === 0 ? baseX + 180 : baseX + 20;
      pathPoints.push({ x, y });
    }

    let pathD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 1; i < pathPoints.length; i++) {
      const prevPoint = pathPoints[i - 1];
      const currPoint = pathPoints[i];
      const midY = (prevPoint.y + currPoint.y) / 2;
      pathD += ` Q ${prevPoint.x} ${midY}, ${currPoint.x} ${currPoint.y}`;
    }

    return (
      <svg style={styles.svgPath} viewBox="0 0 400 1200" preserveAspectRatio="xMidYMin slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path 
          d={pathD} 
          fill="none" 
          stroke="rgba(0, 255, 65, 0.2)" 
          strokeWidth="3" 
          strokeDasharray="10,5"
          filter="url(#glow)"
        />
      </svg>
    );
  };

  const currentRankData = ranks.find(r => r.points <= currentPoints && !r.completed) || ranks[ranks.length - 1];

  return (
    <div style={styles.container}>
      <div style={styles.matrixBg} />
      
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>PROGRESSION_MATRIX</h1>
        <button style={styles.closeButton}>
          <X size={24} color="#00ff41" />
        </button>
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statsHeader}>
          <div style={styles.statsLeft}>
            <span style={styles.currentRankLabel}>CURRENT_RANK:</span>
            <h2 style={styles.currentRank}>Silver Bishop</h2>
            <span style={styles.pointsDisplay}>{currentPoints} points</span>
          </div>
          <div style={styles.rankAvatar}>
            ♗
          </div>
        </div>
        <button 
          style={styles.shareButton}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Share2 size={18} />
          <span>SHARE_PROGRESS</span>
        </button>
      </div>

      {nextRank && (
        <div style={styles.nextRankCard}>
          <div style={styles.nextRankTitle}>NEXT_MILESTONE:</div>
          <div style={styles.nextRankInfo}>
            <span style={styles.nextRankName}>{nextRank.name}</span>
            <span style={styles.pointsNeeded}>{pointsToNext} points needed</span>
          </div>
        </div>
      )}

      <div style={styles.progressSection}>
        <div style={styles.pathContainer}>
          {renderPath()}
          
          {ranks.map((rank, index) => {
            const isLeft = index % 2 === 0;
            const isUnlocked = rank.unlocked || rank.completed;
            
            return (
              <div 
                key={rank.id}
                style={{
                  ...styles.rankNode,
                  ...(isLeft ? styles.rankNodeLeft : styles.rankNodeRight)
                }}
              >
                <div style={{
                  ...styles.rankCircle,
                  ...(isUnlocked ? styles.rankCircleUnlocked : styles.rankCircleLocked)
                }}>
                  {rank.icon}
                  <div style={{
                    ...styles.statusBadge,
                    ...(isUnlocked ? styles.statusBadgeUnlocked : styles.statusBadgeLocked)
                  }}>
                    {isUnlocked ? 
                      <Unlock size={16} color="#0a0e17" /> : 
                      <Lock size={16} color="#0a0e17" />
                    }
                  </div>
                </div>
                
                <div style={{
                  ...styles.rankInfo,
                  ...(isLeft ? {} : styles.rankInfoRight)
                }}>
                  <div style={{
                    ...styles.rankName,
                    ...(isUnlocked ? styles.rankNameUnlocked : styles.rankNameLocked)
                  }}>
                    {rank.name}
                  </div>
                  <div style={{
                    ...styles.rankPoints,
                    ...(isUnlocked ? styles.rankPointsUnlocked : styles.rankPointsLocked)
                  }}>
                    {rank.points} points
                  </div>
                  <div style={{
                    ...styles.rankReward,
                    ...(isUnlocked ? styles.rankRewardUnlocked : styles.rankRewardLocked)
                  }}>
                    {rank.reward}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatrixProgressionMap;