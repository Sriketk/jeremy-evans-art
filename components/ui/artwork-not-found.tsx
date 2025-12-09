"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArtworkNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-4xl font-light text-gray-900">Artwork Not Found</h1>
        <p className="text-lg text-gray-600">
          The artwork you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            asChild
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Link href="/gallery">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

