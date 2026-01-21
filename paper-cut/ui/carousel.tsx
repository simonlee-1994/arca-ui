"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/themes/paper-cut/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

type CarouselContentProps = React.ComponentProps<"div"> & {
  viewportClassName?: string
}

function CarouselContent({
  className,
  viewportClassName,
  ...props
}: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className={cn("overflow-hidden rounded-[24px]", viewportClassName)}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "default",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -left-14 -translate-y-1/2"
          : "-top-14 left-1/2 -translate-x-1/2 rotate-90"
      )}
    >
      <Button
        data-slot="carousel-previous"
        variant={variant}
        size={size}
        className={cn("size-11 rounded-[20px]", className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="size-5" />
        <span className="sr-only">Previous slide</span>
      </Button>
    </div>
  )
}

function CarouselNext({
  className,
  variant = "default",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center",
        orientation === "horizontal"
          ? "top-1/2 -right-14 -translate-y-1/2"
          : "-bottom-14 left-1/2 -translate-x-1/2 rotate-90"
      )}
    >
      <Button
        data-slot="carousel-next"
        variant={variant}
        size={size}
        className={cn("size-11 rounded-[20px]", className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="size-5" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

function CarouselDots({ className }: { className?: string }) {
  const { api } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  React.useEffect(() => {
    if (!api) return

    setScrollSnaps(api.scrollSnapList())
    setSelectedIndex(api.selectedScrollSnap())

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList())
      onSelect()
    })

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  if (scrollSnaps.length <= 1) return null

  return (
    <div
      data-slot="carousel-dots"
      className={cn("flex items-center justify-center gap-2 mt-4", className)}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "size-2.5 rounded-full border border-paper-edge transition-all duration-200 ease-[cubic-bezier(0.25,0.8,0.25,1)]",
            index === selectedIndex
              ? "bg-foreground scale-110"
              : "bg-secondary/60 hover:bg-secondary"
          )}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}
