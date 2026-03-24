let events = [];
        let lastKey = 'Meta';


        window.addEventListener('DOMContentLoaded', () => {
            loadEvents();
            renderEvents();
        });

        
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('eventTitle').value;
            const date = document.getElementById('eventDate').value;
            const category = document.getElementById('eventCategory').value;
            const description = document.getElementById('eventDescription').value;
            
            const newEvent = {
                id: Date.now(),
                title,
                date,
                category,
                description
            };
            
            events.push(newEvent);
            saveEvents();
            renderEvents();
            
        
            e.target.reset();
        });

        
        function renderEvents() {
            const eventsList = document.getElementById('eventsList');
            
            if (events.length === 0) {
                eventsList.innerHTML = '<div class="empty-state">No events yet. Add your first event!</div>';
                return;
            }
            
            eventsList.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p>📅 ${new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                        <p>${event.description}</p>
                        <span class="event-category">${event.category}</span>
                    </div>
                    <div class="event-actions">
                        <button onclick="deleteEvent(${event.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        
        function deleteEvent(id) {
            events = events.filter(event => event.id !== id);
            saveEvents();
            renderEvents();
        }

        
        function clearAllEvents() {
            if (events.length === 0) return;
            
            if (confirm('Are you sure you want to delete all events?')) {
                events = [];
                saveEvents();
                renderEvents();
            }
        }

        
        function addSampleEvents() {
            const sampleEvents = [
                {
                    id: Date.now(),
                    title: 'Tech Conference 2026',
                    date: '2026-03-15',
                    category: 'Conference',
                    description: 'Annual technology conference featuring the latest innovations'
                },
                {
                    id: Date.now() + 1,
                    title: 'Design Workshop',
                    date: '2026-04-20',
                    category: 'Workshop',
                    description: 'Hands-on workshop for UI/UX designers'
                },
                {
                    id: Date.now() + 2,
                    title: 'Developer Meetup',
                    date: '2026-05-10',
                    category: 'Meetup',
                    description: 'Monthly gathering for local developers'
                }
            ];
            
            events = [...events, ...sampleEvents];
            saveEvents();
            renderEvents();
        }

        
        function saveEvents() {
            localStorage.setItem('smartEvents', JSON.stringify(events));
        }

        
        function loadEvents() {
            const stored = localStorage.getItem('smartEvents');
            if (stored) {
                events = JSON.parse(stored);
            }
        }

        
        document.addEventListener('keydown', (e) => {
            lastKey = e.key;
            document.getElementById('keyDisplay').textContent = e.key;
        });