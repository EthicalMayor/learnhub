import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../custom-components/custom-components";
import { Button } from "../custom-components/custom-components";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../custom-components/custom-components";

const CollegeNews = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "New Library Opens at University of Michigan",
      date: "October 20, 2024",
      summary: "The new library at University Michigan features state-of-the-art facilities.",
      fullContent: "The newly opened library at University Michigan provides students with advanced study spaces, a digital media lab, and extensive collections of academic resources."
    },
    {
      id: 2,
      title: "MIT Hosts Annual Science Fair",
      date: "October 27, 2024",
      summary: "MIT's science fair showcased innovative student projects.",
      fullContent: "Students from various departments presented their projects, ranging from robotics to environmental science, attracting local media attention."
    },
    {
      id: 3,
      title: "ALU Receives Prestigious Accreditation",
      date: "October 18, 2024",
      summary: "ALU has been accredited by the National Educational Association.",
      fullContent: "This accreditation is a testament to the quality of education offered at ALU and enhances the value of degrees earned by its students."
    },
  ]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setIsDetailModalOpen(true);
  };

  const NewsDetailModal = () => (
    <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{selectedNews?.title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {selectedNews?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>{selectedNews?.fullContent}</p>
        </div>
        <Button onClick={() => setIsDetailModalOpen(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">College News</h1>
        <p className="text-gray-600 mt-2">Stay updated with the latest news from various campuses</p>

        <div className="grid grid-cols-1 gap-6 mt-6">
          {news.map((newsItem) => (
            <Card key={newsItem.id} onClick={() => handleNewsClick(newsItem)} className="cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{newsItem.title}</CardTitle>
                <p className="text-gray-500">{newsItem.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{newsItem.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedNews && <NewsDetailModal />}
      </div>
    </div>
  );
};

export default CollegeNews;
