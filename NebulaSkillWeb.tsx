import React, { useState } from 'react';
import { X, Share2, Lock, Unlock, Eye, Star, Zap, HelpCircle } from 'lucide-react';

const NebulaSkillWeb = () => {
  const [currentPoints, setCurrentPoints] = useState(208);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const nodes = [
    // CORE - Current position (center)
    {
      id: 'core',
      type: 'core',
      name: 'Silver Bishop',
      icon: '♗',
      points: 200,
      unlocked: true,
      x: 50,
      y: 50,
      description: 'Your current rank and capabilities',
      connections: ['horizon1', 'horizon2', 'horizon3']
    },
    
    // HORIZON - Tier 1: Immediate next steps (visible choices)
    {
      id: 'horizon1',
      type: 'horizon',
      name: 'Weekly Challenges',
      icon: '🎯',
      points: 400,
      cost: 200,
      unlocked: false,
      x: 25,
      y: 30,
      description: 'Unlock weekly skill challenges with exclusive rewards',
      reward: 'Access to curated weekly challenges',
      connections: ['shroud1', 'shroud2']
    },
    {
      id: 'horizon2',
      type: 'horizon',
      name: 'Advanced E-commerce',
      icon: '💰',
      points: 350,
      cost: 150,
      unlocked: false,
      x: 75,
      y: 30,
      description: 'Deep dive into online store optimization',
      reward: '12 advanced e-commerce lessons',
      connections: ['shroud3']
    },
    {
      id: 'horizon3',
      type: 'horizon',
      name: 'Client Acquisition',
      icon: '🎓',
      points: 450,
      cost: 250,
      unlocked: false,
      x: 50,
      y: 25,
      description: 'Master the art of finding and closing clients',
      reward: 'Complete client acquisition framework',
      connections: ['shroud2', 'shroud4']
    },
    
    // SHROUD - Tier 2: Near future (vague hints)
    {
      id: 'shroud1',
      type: 'shroud',
      name: 'Inner Circle',
      icon: '👥',
      unlocked: false,
      x: 15,
      y: 15,
      hint: 'Exclusive community access',
      requirement: 'Requires Gold Tier',
      connections: ['deep1', 'deep2']
    },
    {
      id: 'shroud2',
      type: 'shroud',
      name: 'Mentorship',
      icon: '🎖️',
      unlocked: false,
      x: 40,
      y: 10,
      hint: 'Direct guidance from experts',
      requirement: 'Unlock 2 Horizon skills',
      connections: ['deep3']
    },
    {
      id: 'shroud3',
      type: 'shroud',
      name: 'Advanced Analytics',
      icon: '📊',
      unlocked: false,
      x: 85,
      y: 15,
      hint: 'Deep business intelligence',
      requirement: 'Requires Gold Tier',
      connections: ['deep4']
    },
    {
      id: 'shroud4',
      type: 'shroud',
      name: 'Network Builder',
      icon: '🌐',
      unlocked: false,
      x: 60,
      y: 12,
      hint: 'Strategic relationship tools',
      requirement: 'Complete Client Acquisition',
      connections: ['deep5']
    },
    
    // DEEP - Tier 3: Long-term future (pure mystery)
    {
      id: 'deep1',
      type: 'deep',
      unlocked: false,
      x: 10,
      y: 5,
      connections: []
    },
    {
      id: 'deep2',
      type: 'deep',
      unlocked: false,
      x: 25,
      y: 2,
      connections: []
    },
    {
      id: 'deep3',
      type: 'deep',
      unlocked: false,
      x: 45,
      y: 3,
      connections: []
    },
    {
      id: 'deep4',
      type: 'deep',
      unlocked: false,
      x: 75,
      y: 4,
      connections: []
    },
    {
      id: 'deep5',
      type: 'deep',
      unlocked: false,
      x: 90,
      y: 6,
      connections: []
    }
  ];

  const styles = {
    container: {
      backgroundColor: '#0a0e17',
      minHeight: '100vh',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    nebulaBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(240, 184, 108, 0.1) 0%, transparent 40%)',
      pointerEvents: 'none',
    },
    header: {
      padding: '16px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
      position: 'relative',
      zIndex: 100,
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#f0b86c',
      textShadow: '0 0 10px rgba(240, 184, 108, 0.5)',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
    },
    statsCard: {
      position: 'absolute',
      top: '80px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, rgba(15, 19, 24, 0.95) 0%, rgba(10, 14, 23, 0.95) 100%)',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      zIndex: 90,
    },
    statsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentRank: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#f0b86c',
      textShadow: '0 0 15px rgba(240, 184, 108, 0.6)',
    },
    pointsDisplay: {
      fontSize: '18px',
      color: '#3b82f6',
      fontWeight: '600',
    },
    webContainer: {
      position: 'absolute',
      top: '200px',
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    svgContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    node: {
      position: 'absolute',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 10,
    },
    nodeCore: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(240, 184, 108, 0.4) 0%, rgba(15, 19, 24, 0.9) 70%)',
      border: '4px solid #f0b86c',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 40px rgba(240, 184, 108, 0.8), inset 0 0 30px rgba(240, 184, 108, 0.3)',
    },
    nodeHorizon: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(15, 19, 24, 0.9) 70%)',
      border: '3px solid #3b82f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.2)',
    },
    nodeShroud: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(100, 100, 100, 0.2) 0%, rgba(15, 19, 24, 0.95) 70%)',
      border: '2px solid rgba(100, 100, 100, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 20px rgba(100, 100, 100, 0.3)',
      backdropFilter: 'blur(8px)',
    },
    nodeDeep: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
      animation: 'pulse 3s ease-in-out infinite',
    },
    nodeIcon: {
      fontSize: '32px',
      marginBottom: '4px',
    },
    nodeName: {
      fontSize: '11px',
      fontWeight: '600',
      textAlign: 'center',
      marginTop: '8px',
      maxWidth: '120px',
    },
    detailPanel: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      right: '20px',
      background: 'linear-gradient(135deg, rgba(15, 19, 24, 0.98) 0%, rgba(10, 14, 23, 0.98) 100%)',
      padding: '24px',
      borderRadius: '16px',
      border: '2px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.7)',
      zIndex: 95,
    },
    detailHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    detailTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#f0b86c',
      textShadow: '0 0 15px rgba(240, 184, 108, 0.6)',
    },
    detailCost: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#3b82f6',
    },
    detailDescription: {
      fontSize: '15px',
      color: '#a0aec0',
      lineHeight: '1.6',
      marginBottom: '12px',
    },
    detailReward: {
      padding: '12px',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      borderRadius: '8px',
      color: '#3b82f6',
      fontSize: '14px',
      marginBottom: '16px',
    },
    unlockButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#f0b86c',
      border: 'none',
      borderRadius: '12px',
      color: '#0a0e17',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(240, 184, 108, 0.4)',
      transition: 'all 0.3s ease',
    },
    shroudHint: {
      padding: '12px',
      backgroundColor: 'rgba(100, 100, 100, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.3)',
      borderRadius: '8px',
      color: '#a0aec0',
      fontSize: '14px',
      fontStyle: 'italic',
      marginBottom: '12px',
    },
    requirement: {
      padding: '12px',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      color: '#ef4444',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  const renderConnections = () => {
    const lines = [];
    nodes.forEach(node => {
      if (node.connections) {
        node.connections.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            const isVisible = node.type === 'core' || node.type === 'horizon';
            lines.push(
              <line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={isVisible ? 'rgba(59, 130, 246, 0.3)' : 'rgba(100, 100, 100, 0.15)'}
                strokeWidth="2"
                strokeDasharray={isVisible ? '0' : '5,5'}
              />
            );
          }
        });
      }
    });
    return lines;
  };

  const renderNode = (node) => {
    const isHovered = hoveredNode === node.id;
    const style = {
      ...styles.node,
      left: `calc(${node.x}% - ${node.type === 'core' ? 50 : node.type === 'horizon' ? 40 : node.type === 'shroud' ? 35 : 10}px)`,
      top: `calc(${node.y}% - ${node.type === 'core' ? 50 : node.type === 'horizon' ? 40 : node.type === 'shroud' ? 35 : 10}px)`,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    };

    let nodeStyle;
    let content;

    if (node.type === 'core') {
      nodeStyle = styles.nodeCore;
      content = (
        <>
          <div style={styles.nodeIcon}>{node.icon}</div>
          <div style={{fontSize: '10px', color: '#f0b86c', fontWeight: '600'}}>{node.name}</div>
        </>
      );
    } else if (node.type === 'horizon') {
      nodeStyle = styles.nodeHorizon;
      content = (
        <>
          <div style={{fontSize: '28px'}}>{node.icon}</div>
          {currentPoints >= node.points && (
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)',
            }}>
              <Zap size={14} color="#ffffff" />
            </div>
          )}
        </>
      );
    } else if (node.type === 'shroud') {
      nodeStyle = styles.nodeShroud;
      content = (
        <>
          <Lock size={24} color="#646464" />
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'rgba(100, 100, 100, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Eye size={14} color="#a0aec0" />
          </div>
        </>
      );
    } else if (node.type === 'deep') {
      nodeStyle = styles.nodeDeep;
      content = null;
    }

    return (
      <div
        key={node.id}
        style={style}
        onClick={() => node.type !== 'deep' && setSelectedNode(node)}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <div style={nodeStyle}>
          {content}
        </div>
        {node.type !== 'deep' && node.type !== 'core' && (
          <div style={{...styles.nodeName, color: node.type === 'horizon' ? '#3b82f6' : '#646464'}}>
            {node.name}
          </div>
        )}
      </div>
    );
  };

  const renderDetailPanel = () => {
    if (!selectedNode) return null;

    const canAfford = currentPoints >= (selectedNode.cost || 0);

    return (
      <div style={styles.detailPanel}>
        <div style={styles.detailHeader}>
          <div style={styles.detailTitle}>{selectedNode.name}</div>
          {selectedNode.cost && (
            <div style={styles.detailCost}>{selectedNode.cost} points</div>
          )}
          <button 
            style={{...styles.closeButton, position: 'static'}}
            onClick={() => setSelectedNode(null)}
          >
            <X size={24} color="#a0aec0" />
          </button>
        </div>

        {selectedNode.type === 'horizon' && (
          <>
            <div style={styles.detailDescription}>{selectedNode.description}</div>
            <div style={styles.detailReward}>
              <strong>Reward:</strong> {selectedNode.reward}
            </div>
            <button
              style={{
                ...styles.unlockButton,
                opacity: canAfford ? 1 : 0.5,
                cursor: canAfford ? 'pointer' : 'not-allowed',
              }}
              disabled={!canAfford}
              onMouseEnter={e => {
                if (canAfford) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(240, 184, 108, 0.5)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(240, 184, 108, 0.4)';
              }}
            >
              {canAfford ? 'Unlock Now' : `Need ${selectedNode.cost - currentPoints} more points`}
            </button>
          </>
        )}

        {selectedNode.type === 'shroud' && (
          <>
            <div style={styles.shroudHint}>
              <HelpCircle size={16} style={{display: 'inline', marginRight: '8px'}} />
              {selectedNode.hint}
            </div>
            <div style={styles.requirement}>
              <Lock size={16} />
              {selectedNode.requirement}
            </div>
          </>
        )}
      </div>
    );
  };

  // Add keyframe animation for pulse effect
  if (!document.getElementById('pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation';
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          opacity: 0.6;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div style={styles.container}>
      <div style={styles.nebulaBg} />
      
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Skill Nebula</h1>
        <button style={styles.closeButton}>
          <X size={24} color="#a0aec0" />
        </button>
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statsRow}>
          <div>
            <div style={{fontSize: '12px', color: '#a0aec0', marginBottom: '4px'}}>Current Rank</div>
            <div style={styles.currentRank}>Silver Bishop ♗</div>
          </div>
          <div style={{textAlign: 'right'}}>
            <div style={{fontSize: '12px', color: '#a0aec0', marginBottom: '4px'}}>Points</div>
            <div style={styles.pointsDisplay}>{currentPoints}</div>
          </div>
        </div>
      </div>

      <div style={styles.webContainer}>
        <svg style={{...styles.svgContainer, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {renderConnections()}
        </svg>
        
        {nodes.map(node => renderNode(node))}
      </div>

      {renderDetailPanel()}
    </div>
  );
};

export default NebulaSkillWeb;
