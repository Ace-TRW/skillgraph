import { useState, useEffect } from 'react';
import { X, Star, BookOpen, Gift, Users, Zap, Trophy, Award, ChevronRight } from 'lucide-react';

export default function ProgressionTracker() {
  const initialTime = { days: 30, hours: 0, minutes: 0 };
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32 });
  const [expandedPerk, setExpandedPerk] = useState<string | null>(null);
  const [showPowerLevelTooltip, setShowPowerLevelTooltip] = useState(false);
  const [showXpGainTooltip, setShowXpGainTooltip] = useState(false);

  const [xpGainVisible, setXpGainVisible] = useState(true);

  useEffect(() => {
    // Hide XP gain bar after animation
    const timer = setTimeout(() => {
      setXpGainVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const currentRank = {
    name: 'Silver Bishop',
    icon: '♗'
  };

  const nextRank = {
    name: 'Silver Rook',
    icon: '♖',
    rewards: [
      {
        icon: <Zap size={20} />,
        text: 'Weekly Challenges',
        description: 'Get access to exclusive weekly challenges designed to sharpen your skills and compete with other learners for rewards.'
      },
      {
        icon: <Gift size={20} />,
        text: '10 Bonus Lessons',
        description: 'Unlock 10 premium bonus lessons covering advanced topics and specialized techniques not available in the standard curriculum.'
      },
      {
        icon: <Trophy size={20} />,
        text: 'Leaderboard Access',
        description: 'View your ranking among peers, track your progress, and see how you stack up against top performers in your cohort.'
      }
    ]
  };

  const upcomingRewards = [
    {
      icon: <Users size={20} />,
      text: 'Private Mentor Sessions',
      description: 'One-on-one sessions with expert mentors who provide personalized guidance and feedback on your learning journey.'
    },
    {
      icon: <Award size={20} />,
      text: 'Exclusive Campus Access',
      description: 'Get invited to exclusive campus events, workshops, and networking opportunities with industry professionals.'
    },
    {
      icon: <BookOpen size={20} />,
      text: 'Premium Course Library',
      description: 'Access our entire premium course library with hundreds of advanced courses across all skill levels and topics.'
    },
    {
      icon: <Star size={20} />,
      text: 'All Features Unlocked',
      description: 'Unlock every feature on the platform including AI tutoring, project reviews, certification paths, and priority support.'
    }
  ];

  // Progress fills as time counts DOWN
  const remainingMinutes = timeLeft.days * 24 * 60 + timeLeft.hours * 60 + timeLeft.minutes;
  const initialMinutes = initialTime.days * 24 * 60 + initialTime.hours * 60 + initialTime.minutes;
  const progressPercentage = initialMinutes > 0 ? ((initialMinutes - remainingMinutes) / initialMinutes) * 100 : 0;

  // Power Level System (RuneScape-style XP scaling)
  const calculateTotalXPForLevel = (level: number): number => {
    if (level === 1) return 0;
    let total = 0;
    for (let i = 1; i < level; i++) {
      total += Math.floor(i + 300 * Math.pow(2, i / 7));
    }
    return Math.floor(total / 4);
  };

  // Current power level and XP
  const currentPowerLevel = 5; // Example: user is at level 5
  const currentXP = 450; // Example: current XP (between 388 and 512)
  const xpForCurrentLevel = calculateTotalXPForLevel(currentPowerLevel);
  const xpForNextLevel = calculateTotalXPForLevel(currentPowerLevel + 1);
  const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
  const xpProgressInCurrentLevel = currentXP - xpForCurrentLevel;
  const xpGainAmount = 14;
  // When visible, base progress excludes the gain. When invisible (absorbed), base includes it.
  const currentDisplayedProgress = xpGainVisible 
    ? ((xpProgressInCurrentLevel - xpGainAmount) / xpNeededForNextLevel) * 100
    : (xpProgressInCurrentLevel / xpNeededForNextLevel) * 100;
    
  const xpGainProgress = (xpGainAmount / xpNeededForNextLevel) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 8px rgba(212, 165, 116, 0.3);
          }
          50% {
            box-shadow: 0 0 12px rgba(212, 165, 116, 0.5);
          }
        }

        @keyframes shine {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .modal-overlay {
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          animation: slideUp 0.3s ease-out;
        }

        .timer-box {
          animation: pulse 3s ease-in-out infinite;
        }

        .reward-item {
          transition: all 0.2s ease;
        }

        .reward-item:hover {
          transform: translateX(4px);
          background: rgba(59, 130, 246, 0.05) !important;
        }

        .upcoming-item {
          transition: all 0.2s ease;
        }

        .upcoming-item:hover {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>

      {/* Modal Overlay */}
      <div className="modal-overlay" style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 1000,
      }}>
        {/* Modal Content */}
        <div className="modal-content" style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          background: '#060b15',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          overflow: 'auto',
          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 20px 4px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              margin: 0,
              color: '#d4a574',
            }}>YOUR NEXT POWER UP IN:</h1>
            <button style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}>
              <X size={24} color="#a0aec0" />
            </button>
          </div>

          <div style={{
            padding: '24px',
          }}>
            {/* Timer Section */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, #060b15 100%)',
              border: '1px solid rgba(212, 165, 116, 0.2)',
              borderRadius: '16px',
              padding: '24px 20px',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(212, 165, 116, 0.03), transparent 60%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                position: 'relative',
                zIndex: 1,
              }}>
                {/* Timer Display */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '24px',
                }}>
                  <div className="timer-box" style={{
                    flex: 1,
                    background: '#060b15',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      fontFamily: '"Black Ops One", monospace',
                      color: '#ffffff',
                      lineHeight: '1',
                      marginBottom: '4px',
                    }}>{String(timeLeft.days).padStart(2, '0')}</div>
                    <div style={{
                      fontSize: '10px',
                      color: '#a0aec0',
                      textTransform: 'uppercase',
                    }}>Days</div>
                  </div>

                  <div className="timer-box" style={{
                    flex: 1,
                    background: '#060b15',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      fontFamily: '"Black Ops One", monospace',
                      color: '#ffffff',
                      lineHeight: '1',
                      marginBottom: '4px',
                    }}>{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div style={{
                      fontSize: '10px',
                      color: '#a0aec0',
                      textTransform: 'uppercase',
                    }}>Hours</div>
                  </div>

                  <div className="timer-box" style={{
                    flex: 1,
                    background: '#060b15',
                    border: '1px solid rgba(212, 165, 116, 0.2)',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      fontFamily: '"Black Ops One", monospace',
                      color: '#ffffff',
                      lineHeight: '1',
                      marginBottom: '4px',
                    }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div style={{
                      fontSize: '10px',
                      color: '#a0aec0',
                      textTransform: 'uppercase',
                    }}>Min</div>
                  </div>
                </div>

                {/* Rank Progression */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      fontSize: '48px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                      border: '2px solid #3b82f6',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                      color: '#cbd5e1'
                    }}>
                      {currentRank.icon}
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#a0aec0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '2px',
                      }}>Current</div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#3b82f6'
                      }}>{currentRank.name}</div>
                    </div>
                  </div>

                  <ChevronRight size={28} color="#d4a574" />

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}>
                    <div style={{
                      fontSize: '48px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '2px solid #d4a574',
                      backgroundColor: 'rgba(212, 165, 116, 0.1)',
                      color: '#cbd5e1'
                    }}>
                      {nextRank.icon}
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#a0aec0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '2px',
                      }}>Next</div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#d4a574'
                      }}>{nextRank.name}</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#a0aec0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    YOUR CHESS RANK
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                  }}>
                    {Math.ceil(initialTime.days - timeLeft.days - (timeLeft.hours/24))} / {initialTime.days} Days
                  </div>
                </div>
                <div style={{
                  background: 'rgba(212, 165, 116, 0.05)',
                  borderRadius: '4px',
                  height: '8px',
                  overflow: 'hidden',
                  marginBottom: '20px',
                }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #d4a574 0%, #e5c38c 50%, #fff 80%, #e5c38c 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease',
                    boxShadow: '0 0 12px rgba(212, 165, 116, 0.5), inset 0 0 4px rgba(255, 255, 255, 0.2)',
                    width: `${Math.min(progressPercentage, 100)}%`
                  }} />
                </div>

                {/* Power Level Section */}
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#a0aec0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                }}>
                  Your Power Level
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                  }}>
                    Lv.{currentPowerLevel} → Lv.{currentPowerLevel + 1}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#a0aec0',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span
                      style={{
                        color: '#4ade80',
                        fontWeight: '700',
                        marginRight: '8px',
                        fontSize: '13px',
                        cursor: 'help',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseEnter={() => setShowXpGainTooltip(true)}
                      onMouseLeave={() => setShowXpGainTooltip(false)}
                    >
                      +14 XP
                      {showXpGainTooltip && (
                        <div style={{
                          position: 'absolute',
                          bottom: '150%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#060b15',
                          border: '1px solid rgba(74, 222, 128, 0.5)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          whiteSpace: 'nowrap',
                          fontSize: '12px',
                          color: '#ffffff',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                          zIndex: 1000,
                          pointerEvents: 'none',
                        }}>
                          <div style={{ fontWeight: '600', color: '#4ade80', marginBottom: '2px' }}>
                            XP Gained
                          </div>
                          <div style={{ fontSize: '11px', color: '#a0aec0' }}>
                            Since last check
                          </div>
                          <div style={{
                            position: 'absolute',
                            bottom: '-6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid #060b15',
                          }} />
                        </div>
                      )}
                    </span>
                    {xpProgressInCurrentLevel.toLocaleString()} / {xpNeededForNextLevel.toLocaleString()} XP
                  </div>
                </div>

                {/* Power Level Progress Bar */}
                <div
                  style={{
                    background: 'rgba(255, 69, 0, 0.05)',
                    borderRadius: '4px',
                    height: '8px',
                    overflow: 'visible',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setShowPowerLevelTooltip(true)}
                  onMouseLeave={() => setShowPowerLevelTooltip(false)}
                >
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #ff0000 0%, #ff4500 25%, #ff8c00 50%, #ffa500 75%, #ffd700 100%)',
                    borderRadius: xpGainVisible ? '4px 0 0 4px' : '4px',
                    transition: 'width 0.3s ease',
                    boxShadow: '0 0 8px rgba(255, 69, 0, 0.5)',
                    width: `${Math.min(currentDisplayedProgress, 100)}%`,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 1
                  }} />
                  
                  {/* XP Gain Animated Section */}
                  {xpGainVisible && (
                    <div style={{
                      height: '100%',
                      background: '#4ade80',
                      borderRadius: '0 4px 4px 0',
                      position: 'absolute',
                      left: `${Math.min(currentDisplayedProgress, 100)}%`,
                      top: 0,
                      width: `${Math.min(xpGainProgress, 100 - currentDisplayedProgress)}%`,
                      zIndex: 2,
                      boxShadow: '0 0 10px rgba(74, 222, 128, 0.6)',
                      animation: 'fadeOut 0.5s ease-out 3.5s forwards',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
                    }} />
                  )}
                  {showPowerLevelTooltip && (
                    <div style={{
                      position: 'absolute',
                      bottom: '120%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#060b15',
                      border: '1px solid rgba(255, 69, 0, 0.5)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                      color: '#ffffff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                      zIndex: 1000,
                      pointerEvents: 'none',
                    }}>
                      <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                        {(xpNeededForNextLevel - xpProgressInCurrentLevel).toLocaleString()} XP remaining
                      </div>
                      <div style={{ fontSize: '11px', color: '#a0aec0' }}>
                        to reach Level {currentPowerLevel + 1}
                      </div>
                      {/* Arrow */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid #060b15',
                      }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* What You'll Unlock */}
            <div style={{
              marginBottom: '24px',
            }}>
              <h2 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                marginBottom: '12px',
                color: '#a0aec0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ fontSize: '16px' }}>{nextRank.icon}</span>
                {nextRank.name.toUpperCase()} UNLOCKS:
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {nextRank.rewards.map((reward, index) => {
                  const isExpanded = expandedPerk === `next-${index}`;
                  return (
                    <div
                      key={index}
                      className="reward-item"
                      onClick={() => setExpandedPerk(isExpanded ? null : `next-${index}`)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '12px 14px',
                        background: '#0d1a25',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ color: '#d4a574', display: 'flex', alignItems: 'center' }}>
                          {reward.icon}
                        </div>
                        <div style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#d4a574',
                          flex: 1,
                        }}>{reward.text}</div>
                        <ChevronRight
                          size={16}
                          color="#d4a574"
                          style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </div>
                      {isExpanded && (
                        <div style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontSize: '13px',
                          color: '#a0aec0',
                          lineHeight: '1.5',
                          paddingLeft: '32px',
                        }}>
                          {reward.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coming Soon */}
            <div>
              <h2 style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#ffffff',
              }}>Future Unlocks Include:</h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {upcomingRewards.map((reward, index) => {
                  const isExpanded = expandedPerk === `upcoming-${index}`;
                  return (
                    <div
                      key={index}
                      className="upcoming-item"
                      onClick={() => setExpandedPerk(isExpanded ? null : `upcoming-${index}`)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '12px 14px',
                        background: '#0d1a25',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ color: 'rgba(255, 255, 255, 0.4)', display: 'flex', alignItems: 'center' }}>
                          {reward.icon}
                        </div>
                        <div style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 0.5)',
                          flex: 1,
                        }}>{reward.text}</div>
                        <ChevronRight
                          size={16}
                          color="rgba(255, 255, 255, 0.3)"
                          style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      </div>
                      {isExpanded && (
                        <div style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontSize: '13px',
                          color: '#a0aec0',
                          lineHeight: '1.5',
                          paddingLeft: '32px',
                        }}>
                          {reward.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
