document.addEventListener('DOMContentLoaded', () => {
    const groupForm = document.getElementById('groupForm');
    const groupList = document.getElementById('groupList');

    /
    let studyGroups = JSON.parse(localStorage.getItem('studyGroups')) || [];

       
    function displayGroups() {
        groupList.innerHTML = '';

        if (studyGroups.length === 0) {
            groupList.innerHTML = '<p class="no-groups">No study sessions posted yet. Be the first!</p>';
            return;
        }

        studyGroups.forEach((group, index) => {
            const card = document.createElement('div');
            card.classList.add('study-card');
            
              
            const [hours, minutes] = group.time.split(':');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

            card.innerHTML = `
                <h3>📘 ${group.subject}</h3>
                <p><strong>Topic:</strong> ${group.topic}</p>
                <p><strong>📍 Location:</strong> ${group.location}</p>
                <p><strong>⏰ Time:</strong> ${formattedTime}</p>
            `;
            groupList.appendChild(card);
        });
    }

    
    groupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const subject = document.getElementById('subject').value;
        const topic = document.getElementById('topic').value;
        const location = document.getElementById('location').value;
        const time = document.getElementById('time').value;

        
        const newGroup = { subject, topic, location, time };

        
        studyGroups.push(newGroup);
        localStorage.setItem('studyGroups', JSON.stringify(studyGroups));

        
        displayGroups();
        groupForm.reset();
    });
    /
    displayGroups();
});
