import React, { useCallback, useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './styles/TooltipWrapper.css';

const TooltipWrapper = React.memo(
  ({ children, message, placement = 'bottom', tooltipClass }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(
      window.innerWidth <= 768,
    );
    const renderTooltip = useCallback(
      (props) => (
        <Tooltip
          id={`tooltip-${message.toLowerCase().replace(/ /g, '-')}`}
          {...props}
          className={tooltipClass}
        >
          {message}
        </Tooltip>
      ),
      [message, tooltipClass],
    );
    useEffect(() => {
      if (showTooltip) {
        const timer = setTimeout(() => setShowTooltip(false), 2000);
        return () => clearTimeout(timer);
      }
    }, [showTooltip]);
    useEffect(() => {
      const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (isSmallScreen) {
      return <>{children}</>;
    }
    return (
      <OverlayTrigger
        placement={placement}
        delay={{ show: 50, hide: 250 }}
        overlay={renderTooltip}
        show={showTooltip}
        onToggle={(nextShow) => setShowTooltip(nextShow)}
      >
        {children}
      </OverlayTrigger>
    );
  },
);

export default TooltipWrapper;
