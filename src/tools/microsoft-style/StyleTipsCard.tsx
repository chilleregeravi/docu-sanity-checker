
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StyleTipsCard: React.FC = () => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Microsoft Style Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Core Principles</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Use active voice, not passive</li>
              <li>Address the reader directly using "you"</li>
              <li>Be concise and conversational</li>
              <li>Use sentence-style capitalization in headings</li>
              <li>Avoid using "please" in instructions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Common Transformations</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Instead of</div>
                <div className="font-medium">Use</div>
                <div className="text-red-500">It is necessary to configure...</div>
                <div className="text-green-500">You need to configure...</div>
                <div className="text-red-500">Users should be aware...</div>
                <div className="text-green-500">You should be aware...</div>
                <div className="text-red-500">Click on the button</div>
                <div className="text-green-500">Select the button</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleTipsCard;
