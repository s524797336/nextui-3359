import { Button, NextUIProvider, Tooltip } from "@nextui-org/react";
import type { MetaFunction } from "@remix-run/node";
import { memo, useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const Page = memo(function Page() {
  const [fullscreen, setFullscreen] = useState(false);

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = ref.current
    if (!current) {
      return
    }
    if (fullscreen) {
      current.requestFullscreen()
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
  }, [fullscreen])

  return (
    <div ref={ref}>
      <div>I need to see the tooltip in full screen mode and none full screen mode.</div>
      <div>If i want to see the tooltip in full screen mode, i need to set the portalContainer to the ref div, but error occurs.</div>
      <ol>
        <li>1. Click FullScreen button to enter full screen mode.</li>
        <li>2. Hover over the tooltip to see the error.</li>
      </ol>
      <Button onPress={() => setFullscreen((draft) => !draft)}>FullScreen</Button>
      <Tooltip portalContainer={fullscreen ? ref.current ?? undefined : undefined} content="Hello">Hover me</Tooltip>
    </div>
  )
})

export default function Index() {
  return (
    <NextUIProvider className="bg-black text-white dark">
      <Page />
    </NextUIProvider>
  );
}
