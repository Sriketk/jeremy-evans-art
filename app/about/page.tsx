"use client";

import { useEffect, useRef, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeContext } from "../lib/context/homeContextProvider";

export default function AboutPage() {
  const timelineRef = useRef(null);
  const { aboutPageContent } = useContext(HomeContext);
  const [visibleEvents, setVisibleEvents] = useState<Set<number>>(new Set());
  console.log(aboutPageContent);

  const timelineEvents: any = [];

  aboutPageContent.timelineEvents.forEach((timeLineEvent: any) => {
    timelineEvents.push({
      year: timeLineEvent.fields.year,
      title: timeLineEvent.fields.title,
      description: timeLineEvent.fields.description,
      image: timeLineEvent.fields?.image?.fields.file.url,
      details: timeLineEvent.fields.details,
    });
  });

  useEffect(() => {
    // Progress indicator animation
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineEl = timelineRef.current;
      const timelineRect = (timelineEl as HTMLElement).getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the timeline has been scrolled through
      let progress = 0;
      if (timelineTop <= windowHeight && timelineTop + timelineHeight >= 0) {
        // Calculate progress based on how much of the timeline is above the viewport
        const scrolledPastTop = Math.max(0, windowHeight - timelineTop);
        const totalScrollableHeight = timelineHeight + windowHeight;
        progress = Math.min(
          1,
          Math.max(0, scrolledPastTop / totalScrollableHeight)
        );
      }

      // Update the progress line height
      const progressLine = document.querySelector(".timeline-progress");
      if (progressLine) {
        (progressLine as HTMLElement).style.height = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set positions
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for timeline event animations
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of the element is visible
      rootMargin: "0px 0px -10% 0px", // Start animation slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const eventIndex = Number.parseInt(
          entry.target.getAttribute("data-event-index") || "0"
        );

        if (entry.isIntersecting) {
          setVisibleEvents((prev) => new Set([...prev, eventIndex]));
        }
      });
    }, observerOptions);

    // Observe all timeline event elements
    const eventElements = document.querySelectorAll(".timeline-event");
    eventElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [timelineEvents.length]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl font-light text-gray-900">About</h1>

        <div className="mt-12">
          {/* Artist Intro */}
          <div className="grid grid-cols-1 gap-16 mb-24 lg:grid-cols-2">
            <div className="relative aspect-[3/4]">
              <Image
                src={
                  aboutPageContent.jeremyEvansPicture.fields.file.url ||
                  "/placeholder.svg"
                }
                alt="Artist Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700">
                  {aboutPageContent.about}
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="self-start mt-8 border-gray-300 hover:bg-gray-50"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Timeline with Animation */}
          <div ref={timelineRef} className="relative">
            {/* Timeline center line - responsive positioning */}
            <div className="absolute md:left-1/2 left-[20px] h-full w-px bg-gray-200 transform md:-translate-x-1/2 z-0"></div>
            <div className="absolute md:left-1/2 left-[20px] h-0 w-1 bg-gray-800 transform md:-translate-x-1/2 transition-all duration-300 ease-out timeline-progress z-0"></div>

            {timelineEvents.map((event: any, index: any) => (
              <div
                key={index}
                className={`timeline-event relative mb-16 z-10 transition-all duration-1000 ease-out ${
                  visibleEvents.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                data-event-index={index}
                style={{
                  transitionDelay: `${index * 100}ms`, // Stagger the animations
                }}
              >
                {/* Timeline dot - responsive positioning */}
                <div
                  className={`absolute md:left-1/2 left-[20px] w-4 h-4 bg-white border-2 border-gray-300 rounded-full transform md:-translate-x-1/2 -translate-x-1/2 transition-all duration-500 hover:border-gray-800 hover:scale-125 z-20 ${
                    visibleEvents.has(index)
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-60"
                  }`}
                ></div>

                {/* Content container - responsive layout */}
                <div
                  className={`flex items-start ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content box - responsive width and positioning */}
                  <div
                    className={`md:w-1/2 w-full pl-12 md:pr-0 ${
                      index % 2 === 0
                        ? "md:pr-12 md:text-right md:pl-0"
                        : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block px-3 py-1 mb-2 text-md font-medium text-gray-600 bg-gray-100 rounded-full transition-all duration-500 ${
                        visibleEvents.has(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 100 + 200}ms`,
                      }}
                    >
                      {event.year}
                    </div>

                    <h3
                      className={`text-xl font-medium text-gray-900 transition-all duration-500 ${
                        visibleEvents.has(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    >
                      {event.title}
                    </h3>

                    <p
                      className={`mt-2 text-gray-600 transition-all duration-500 ${
                        visibleEvents.has(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 100 + 400}ms`,
                      }}
                    >
                      {event.description}
                    </p>

                    {event.image && (
                      <div
                        className={`relative mt-4 overflow-hidden rounded-md transition-all duration-1000 ${
                          index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                        } ${
                          visibleEvents.has(index)
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-6 scale-95"
                        }`}
                        style={{
                          transitionDelay: `${index * 100 + 500}ms`,
                        }}
                      >
                        <div
                          className={`max-h-[600px] ${
                            index % 2 === 0 ? "md:text-right" : "md:text-left"
                          }`}
                        >
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            width={500}
                            height={400}
                            className={`object-contain w-full max-w-[500px] h-auto max-h-[600px] ${
                              index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                            }`}
                          />
                        </div>
                      </div>
                    )}

                    {event.details && (
                      <ul
                        className={`mt-3 space-y-1 transition-all duration-500 ${
                          visibleEvents.has(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                        style={{
                          transitionDelay: `${index * 100 + 600}ms`,
                        }}
                      >
                        {event.details.map((detail: any, i: any) => (
                          <li key={i} className="text-sm text-gray-500">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Artist Statement */}
          <div className="max-w-3xl mx-auto mt-24 p-8 bg-gray-50">
            <h2 className="text-2xl font-light text-gray-900">
              Artist Statement
            </h2>
            <div className="mt-6 prose">
              {aboutPageContent.artistStatement
                .split("\n\n")
                .map((paragraph: string, pIndex: number) => (
                  <p key={pIndex} className="mb-4">
                    {paragraph
                      .split("\n")
                      .map((line: string, lIndex: number) => (
                        <span key={lIndex}>
                          {line}
                          {lIndex < paragraph.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
