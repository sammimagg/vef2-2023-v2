INSERT INTO events (name, slug, description, url, location)
VALUES
  ('Forritarahittingur í febrúar','forritarahittingur-i-februar','Forritarar hittast í febrúar og forrita saman eitthvað frábært.','www.google.com','Gróska'),
  ('Hönnuðahittingur í mars','honnudahittingur-i-mars','Spennandi hittingur hönnuða í Hönnunarmars.','www.mbl.is','Askja'),
  ('Verkefnastjórahittingur í apríl','verkefnastjorahittingur-i-april','Virkilega vel verkefnastýrður hittingur.','www.visir.is','Stofnun Árna Magnússonar'),
  ('AI in Finance Conference', 'ai-finance-conference-2023', 'Join us for a deep dive into how AI is transforming the finance industry. Speakers include financial experts and data scientists.', 'https://example.com/ai-finance-conference', 'New York, NY'),
  ('Digital Health Summit', 'digital-health-summit-2023', 'Discover the latest innovations in digital health and healthcare technology. Topics include telemedicine, wearables, and more.', 'https://example.com/digital-health-summit', 'San Francisco, CA'),
  ('Sustainability Leadership Conference', 'sustainability-leadership-conference-2023', 'Join us for a discussion of the latest trends and best practices in sustainable business. Speakers include sustainability experts and business leaders.', 'https://example.com/sustainability-leadership-conference', 'Amsterdam, Netherlands'),
  ('Design Systems Workshop', 'design-systems-workshop-2023', 'Learn how to create effective design systems for your organization in this hands-on workshop. Topics include style guides, pattern libraries, and more.', 'https://example.com/design-systems-workshop', 'Sydney, Australia'),
  ('Data Science Summit', 'data-science-summit-2023', 'Get the latest insights on data science and machine learning. Speakers include leading data scientists and academics.', 'https://example.com/data-science-summit', 'Paris, France'),
  ('Future of Work Conference', 'future-of-work-conference-2023', 'Explore the latest trends and challenges in the changing world of work. Speakers include business leaders, futurists, and HR experts.', 'https://example.com/future-of-work-conference', 'Toronto, Canada'),
  ('International Conference on Renewable Energy', 'conference-renewable-energy-2023', 'Join us for a discussion of the latest research and policies related to renewable energy. Speakers include industry leaders and top researchers.', 'https://example.com/conference-renewable-energy', 'Cape Town, South Africa'),
  ('Virtual Reality Symposium', 'virtual-reality-symposium-2023', 'Discover the latest developments in virtual reality technology and applications. Topics include VR gaming, training, and more.', 'https://example.com/virtual-reality-symposium', 'Austin, TX'),
  ('Marketing Analytics Workshop', 'marketing-analytics-workshop-2023', 'Learn how to leverage data and analytics to drive your marketing strategy. Topics include data visualization, segmentation, and more.', 'https://example.com/marketing-analytics-workshop', 'Singapore'),
  ('Innovation and Entrepreneurship Forum', 'innovation-entrepreneurship-forum-2023', 'Join us for an interactive forum on innovation and entrepreneurship. Topics include startup success stories, funding strategies, and more.', 'https://example.com/innovation-entrepreneurship-forum', 'Dubai, UAE'),
  ('Event 1', 'event-1', 'Description of event 1', 'http://example.com/event1', 'Location 1'),
  ('Event 2', 'event-2', 'Description of event 2', 'http://example.com/event2', 'Location 2'),
  ('Event 3', 'event-3', 'Description of event 3', 'http://example.com/event3', 'Location 3'),
  ('Event 4', 'event-4', 'Description of event 4', 'http://example.com/event4', 'Location 4'),
  ('Event 5', 'event-5', 'Description of event 5', 'http://example.com/event5', 'Location 5'),
  ('Event 6', 'event-6', 'Description of event 6', 'http://example.com/event6', 'Location 6'),
  ('Event 7', 'event-7', 'Description of event 7', 'http://example.com/event7', 'Location 7'),
  ('Event 8', 'event-8', 'Description of event 8', 'http://example.com/event8', 'Location 8'),
  ('Event 9', 'event-9', 'Description of event 9', 'http://example.com/event9', 'Location 9'),
  ('Event 10', 'event-10', 'Description of event 10', 'http://example.com/event10', 'Location 10'),
  ('Event 11', 'event-11', 'Description of event 11', 'http://example.com/event11', 'Location 11'),
  ('Event 12', 'event-12', 'Description of event 12', 'http://example.com/event12', 'Location 12'),
  ('Event 13', 'event-13', 'Description of event 13', 'http://example.com/event13', 'Location 13'),
  ('Event 14', 'event-14', 'Description of event 14', 'http://example.com/event14', 'Location 14'),
  ('Event 15', 'event-15', 'Description of event 15', 'http://example.com/event15', 'Location 15'),
  ('Event 16', 'event-16', 'Description of event 16', 'http://example.com/event16', 'Location 16'),
  ('Event 17', 'event-17', 'Description of event 17', 'http://example.com/event17', 'Location 17'),
  ('Event 18', 'event-18', 'Description of event 18', 'http://example.com/event18', 'Location 18'),
  ('Event 19', 'event-19', 'Description of event 19', 'http://example.com/event19', 'Location 19'),
  ('Event 20', 'event-20', 'Description of event 20', 'http://example.com/event20', 'Location 20');


INSERT INTO registrations (name, comment, event) 
VALUES 
  ('Forvitinn forritari','Hlakka til að forrita með ykkur',1),
  ('Jón Jónsson',null, 1),
  ('Guðrún Guðrúnar','verður vefforritað?',1);

INSERT INTO users (username, password, admin)
VALUES 
  ('admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',true),
  ('user','$2b$11$OBIc88TxUo34sAl9MBdWw.Wr10E/lLQNDOGHfPM0cjo7YBer6W68K', false);
