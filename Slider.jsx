import { useEffect, useState } from "react";

function Slider(props) {
  const [ x, setX ] = useState(0)
  const [ perc, setPerc ] = useState(0)
  const [ isDragging, setIsDragging ] = useState(false)
  const [ initialX, setInitialX ] = useState(0)

  
  const [intervalId, setIntervalId] = useState(null)

  const styles = {
    outer: {
        width: "calc(100vw - 48px)",
        height: 64,
        padding: 8,
        borderRadius: 16,
        background: perc > 0.32 ? "#0B0A07" : "#4CF790",
        position: "relative",
    },
    inner: {
        height: 64,
        width: 64,
        borderRadius: 16,
        background: "#fff",
        position: "absolute",
        left: x + 8,
        zIndex: 2
    },
  }  

  useEffect(() => {
    const position = window.innerWidth - styles.inner.width - 48 - x;
    // console.log(maxPosition, "MP")
    setPerc(position / (window.innerWidth - styles.inner.width - 48))
  }, [x])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setInitialX(e.clientX)

    if (!intervalId) {
      const newIntervalId = setInterval(() => {
        // console.log(e)
      }, 200)
      setIntervalId(newIntervalId)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    clearInterval(intervalId)
    setIntervalId(null)

    console.log(x, Math.min((window.innerWidth - 96) / 3 * 2))
    if(x >= Math.min((window.innerWidth - 96) / 3 * 2)) {
        const remainingDistance = Math.min((window.innerWidth - 112)) - x
        setX(x + remainingDistance)
        props?.verify(true)
    } else {
        setX(0)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDragging])

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - initialX
    setX(Math.max(0, Math.min(window.innerWidth - styles.inner.width - 48, x + deltaX)))
  }

 
  useEffect(() => {
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div style={styles.outer} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="sliderInner" style={styles.inner}>
        &nbsp;
      </div>
    </div>
  )
}

export default Slider
