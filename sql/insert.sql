INSERT INTO events ( name, slug, description,url,location) VALUES ('Forritarahittingur í febrúar', 
                                                                'forritarahittingur-i-februar',
                                                                'Forritarar hittast í febrúar og forrita saman eitthvað frábært.',
                                                                'www.google.com',
                                                                'Gróska'
                                                                );
INSERT INTO events (name, slug, description,url,location) VALUES ('Hönnuðahittingur í mars',
                                                                'honnudahittingur-i-mars',
                                                                'Spennandi hittingur hönnuða í Hönnunarmars.',
                                                                'www.mbl.is',
                                                                'Askja'
                                                                );
INSERT INTO events (name, slug, description,url,location) VALUES ('Verkefnastjórahittingur í apríl',
                                                                'verkefnastjorahittingur-i-april', 
                                                                'Virkilega vel verkefnastýrður hittingur.',
                                                                'www.visir.is',
                                                                'Stofnun Árna Magnússonar'
                                                                );

INSERT INTO registrations (name, comment, event) VALUES ('Forvitinn forritari',
                                                        'Hlakka til að forrita með ykkur',
                                                        1
                                                        );
INSERT INTO registrations (name, comment, event) VALUES ('Jón Jónsson',
                                                        null,
                                                        1
                                                        );
INSERT INTO registrations (name, comment, event) VALUES ('Guðrún Guðrúnar', 
                                                        'verður vefforritað?',
                                                        1
                                                        );

INSERT INTO users (username, password, admin) VALUES ('admin', 
                                                        '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii',
                                                        true
                                                        );
