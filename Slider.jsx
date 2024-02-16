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
        background: perc > 0.67 ? "#4CF790" : "#0B0A07",
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

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setInitialX(e.clientX)


  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setInitialX(e.touches[0].clientX)
  }

  const handleMouseUp = (e) => {
    setIsDragging(false)
    clearInterval(intervalId)
    setIntervalId(null)
    setPerc(x / (window.innerWidth - styles.inner.width - 48))

    if(x >= Math.min((window.innerWidth - 96) / 3 * 2)) {
        const remainingDistance = Math.min((window.innerWidth - 112)) - x
        setX(x + remainingDistance)
        props?.verify(true)
    } else {
        setX(0)
    }
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    setIsDragging(false)
    clearInterval(intervalId)
    setIntervalId(null)
    setPerc(x / (window.innerWidth - styles.inner.width - 48))


    if(x >= Math.min((window.innerWidth - 96) / 2)) {
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
    console.log(deltaX)
    setX(Math.max(0, Math.min(window.innerWidth - styles.inner.width - 48, x + deltaX)))
    setPerc(x / (window.innerWidth - styles.inner.width - 48))
  }

  const handleTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - initialX
    setX(Math.max(0, Math.min(window.innerWidth - styles.inner.width - 48, deltaX)))
    setPerc(x / (window.innerWidth - styles.inner.width - 48))
  }

  useEffect(() => {
    console.log(perc, "perc")
    }, [perc])

 
  useEffect(() => {
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div style={styles.outer} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="sliderInner" style={styles.inner}>
        &nbsp;
      </div>
    </div>
  )
}

export default Slider
