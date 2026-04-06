// // Global Variables
// let currentSongIndex = 0;
// let isPlaying = false;
// let isShuffle = false;
// let repeatMode = 'none'; // 'none', 'all', 'one'
// let isLoggedIn = false;
// let currentPlaylist = [];
// let likedSongs = new Set();
// let currentUser = null;

// // Audio Element
// const audio = document.getElementById('audio');

// // ============================================
// // SONG DATA — uses LOCAL files
// // covers/1.jpg … covers/10.jpg
// // songs/1.mp3  … songs/10.mp3
// // ============================================
// const allSongs = [
//     {
//         id: 1,
//         title: "Blinding Lights",
//         artist: "The Weeknd",
//         album: "After Hours",
//         category: "energetic",
//         duration: "3:20",
//         image: "covers/1.jpg",
//         audio: "songs/1.mp3",
//         plays: 4500000
//     },
//     {
//         id: 2,
//         title: "Levitating",
//         artist: "Dua Lipa",
//         album: "Future Nostalgia",
//         category: "energetic",
//         duration: "3:23",
//         image: "covers/2.jpg",
//         audio: "songs/2.mp3",
//         plays: 3800000
//     },
//     {
//         id: 3,
//         title: "Watermelon Sugar",
//         artist: "Harry Styles",
//         album: "Fine Line",
//         category: "chill",
//         duration: "2:54",
//         image: "covers/3.jpg",
//         audio: "songs/3.mp3",
//         plays: 3200000
//     },
//     {
//         id: 4,
//         title: "Dynamite",
//         artist: "BTS",
//         album: "BE",
//         category: "energetic",
//         duration: "3:19",
//         image: "covers/4.jpg",
//         audio: "songs/4.mp3",
//         plays: 5100000
//     },
//     {
//         id: 5,
//         title: "Lo-Fi Dreams",
//         artist: "Chill Vibes",
//         album: "Relaxation",
//         category: "chill",
//         duration: "2:45",
//         image: "covers/5.jpg",
//         audio: "songs/5.mp3",
//         plays: 2100000
//     },
//     {
//         id: 6,
//         title: "Power Workout",
//         artist: "Gym Beats",
//         album: "Fitness Mix",
//         category: "workout",
//         duration: "3:10",
//         image: "covers/6.jpg",
//         audio: "songs/6.mp3",
//         plays: 1800000
//     },
//     {
//         id: 7,
//         title: "Focus Flow",
//         artist: "Study Music",
//         album: "Concentration",
//         category: "focus",
//         duration: "4:05",
//         image: "covers/7.jpg",
//         audio: "songs/7.mp3",
//         plays: 2900000
//     },
//     {
//         id: 8,
//         title: "Top Hits 2024",
//         artist: "Various Artists",
//         album: "Best of 2024",
//         category: "energetic",
//         duration: "3:33",
//         image: "covers/8.jpg",
//         audio: "songs/8.mp3",
//         plays: 5500000
//     },
//     {
//         id: 9,
//         title: "Sunset Chill",
//         artist: "Lofi Beats",
//         album: "Evening Vibes",
//         category: "chill",
//         duration: "2:58",
//         image: "covers/9.jpg",
//         audio: "songs/9.mp3",
//         plays: 1650000
//     },
//     {
//         id: 10,
//         title: "Beast Mode",
//         artist: "Workout Music",
//         album: "Gym Anthems",
//         category: "workout",
//         duration: "3:42",
//         image: "covers/10.jpg",
//         audio: "songs/10.mp3",
//         plays: 2200000
//     }
// ];

// // Playlist Data
// const playlists = {
//     all:       { name: "All Songs",       songs: [...allSongs] },
//     chill:     { name: "Lo-Fi Beats",     songs: allSongs.filter(s => s.category === "chill") },
//     energetic: { name: "Top Hits 2024",   songs: allSongs.filter(s => s.category === "energetic") },
//     workout:   { name: "Gym Motivation",  songs: allSongs.filter(s => s.category === "workout") },
//     focus:     { name: "Focus Flow",      songs: allSongs.filter(s => s.category === "focus") }
// };

// // "Made For You" cards — each maps to a playlist key so clicking plays music
// const cardData = [
//     { title: "Daily Mix 1",      subtitle: "Made for You",        playlistKey: "energetic", image: "covers/1.jpg" },
//     { title: "Daily Mix 2",      subtitle: "Made for You",        playlistKey: "chill",     image: "covers/2.jpg" },
//     { title: "Discover Weekly",  subtitle: "Your weekly mixtape", playlistKey: "all",       image: "covers/3.jpg" },
//     { title: "Release Radar",    subtitle: "New music for you",   playlistKey: "energetic", image: "covers/4.jpg" },
//     { title: "On Repeat",        subtitle: "Songs you love",      playlistKey: "chill",     image: "covers/5.jpg" },
//     { title: "Wrapped",          subtitle: "Your year in music",  playlistKey: "all",       image: "covers/6.jpg" }
// ];

// // Recently Played
// let recentlyPlayed = [];
// try { recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || []; } catch (e) { recentlyPlayed = []; }

// // ============================================
// // INITIALIZATION
// // ============================================

// document.addEventListener('DOMContentLoaded', function () {
//     initializeApp();
// });

// function initializeApp() {
//     loadUserSession();
//     loadLikedSongs();
//     loadRecentlyPlayed();
//     renderRecentlyPlayed();
//     renderCards();
//     renderLibrary();
//     setupEventListeners();
//     setupKeyboardShortcuts();

//     if (!isLoggedIn) {
//         const loginModal = document.getElementById('login-modal');
//         if (loginModal) loginModal.style.display = 'flex';
//     }
// }

// // ============================================
// // MODAL FUNCTIONS
// // ============================================

// function openModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
// }

// function closeModal(modalId) {
//     const modal = document.getElementById(modalId);
//     if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
// }

// function switchModal(fromModal, toModal) {
//     closeModal(fromModal);
//     setTimeout(() => openModal(toModal), 200);
// }

// window.onclick = function (event) {
//     if (event.target.classList.contains('modal')) {
//         event.target.style.display = 'none';
//         document.body.style.overflow = 'auto';
//     }
// };

// // ============================================
// // AUTHENTICATION
// // ============================================

// function handleLogin(event) {
//     event.preventDefault();
//     const email    = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     if (email && password.length >= 6) {
//         isLoggedIn  = true;
//         currentUser = {
//             name:      email.split('@')[0],
//             email:     email,
//             followers: Math.floor(Math.random() * 1000),
//             following: Math.floor(Math.random() * 500)
//         };
//         try { localStorage.setItem('currentUser', JSON.stringify(currentUser)); } catch (e) {}
//         closeModal('login-modal');
//         updateUIForLoggedInUser();
//         showNotification('Welcome back, ' + currentUser.name + '!');
//     } else {
//         showNotification('Please enter valid credentials');
//     }
// }

// function handleSignup(event) {
//     event.preventDefault();
//     const email        = document.getElementById('signup-email').value;
//     const confirmEmail = document.getElementById('signup-confirm-email').value;
//     const password     = document.getElementById('signup-password').value;
//     const name         = document.getElementById('signup-name').value;

//     if (email !== confirmEmail) { showNotification('Emails do not match'); return; }
//     if (password.length < 6)   { showNotification('Password must be at least 6 characters'); return; }

//     isLoggedIn  = true;
//     currentUser = { name, email, followers: 0, following: 0 };
//     try { localStorage.setItem('currentUser', JSON.stringify(currentUser)); } catch (e) {}
//     closeModal('signup-modal');
//     updateUIForLoggedInUser();
//     showNotification('Welcome to Spotify, ' + name + '!');
// }

// function handleLogout() {
//     isLoggedIn  = false;
//     currentUser = null;
//     try { localStorage.removeItem('currentUser'); } catch (e) {}
//     closeModal('profile-modal');
//     updateUIForLoggedOutUser();
//     showNotification('You have been logged out');
// }

// function loadUserSession() {
//     try {
//         const savedUser = localStorage.getItem('currentUser');
//         if (savedUser) {
//             currentUser = JSON.parse(savedUser);
//             isLoggedIn  = true;
//             updateUIForLoggedInUser();
//         }
//     } catch (e) {}
// }

// function updateUIForLoggedInUser() {
//     const area = document.getElementById('user-profile-area');
//     if (area && currentUser) {
//         area.innerHTML = `
//             <button class="user-btn" onclick="openModal('profile-modal')">
//                 <i class="fa-solid fa-user"></i>
//                 <span>${currentUser.name}</span>
//             </button>`;
//     }
//     const profileName = document.getElementById('profile-name');
//     if (profileName && currentUser) profileName.textContent = currentUser.name;
// }

// function updateUIForLoggedOutUser() {
//     const area = document.getElementById('user-profile-area');
//     if (area) {
//         area.innerHTML = `
//             <button class="sign-up" onclick="openModal('signup-modal')">Sign Up</button>
//             <button class="log-in"  onclick="openModal('login-modal')">Log In</button>`;
//     }
// }

// // ============================================
// // NAVIGATION
// // ============================================

// function showSection(sectionName) {
//     document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
//     const sel = document.getElementById(sectionName + '-section');
//     if (sel) sel.style.display = 'block';

//     document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
//     // highlight the matching nav item
//     document.querySelectorAll('.nav-links a').forEach(a => {
//         if (a.getAttribute('data-section') === sectionName) {
//             a.closest('li').classList.add('active');
//         }
//     });
// }

// function showLibraryTab(tabName, btn) {
//     document.querySelectorAll('.library-tab').forEach(t => t.classList.remove('active'));
//     if (btn) btn.classList.add('active');
//     renderLibraryContent(tabName);
// }

// // ============================================
// // RENDERING
// // ============================================

// function loadRecentlyPlayed() {
//     try { recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || []; } catch (e) { recentlyPlayed = []; }
// }

// function renderRecentlyPlayed() {
//     const container = document.getElementById('recently-played');
//     if (!container) return;
//     const source = recentlyPlayed.length > 0 ? recentlyPlayed.slice(0, 6) : allSongs.slice(0, 6);
//     container.innerHTML = source.map(song => `
//         <div class="recent-item" onclick="playSong(${song.id})">
//             <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
//             <span>${song.title}</span>
//             <i class="fa-solid fa-play play-icon"></i>
//         </div>
//     `).join('');
// }

// // FIX: Cards now carry a playlistKey so clicking actually plays music
// function renderCards() {
//     const container = document.getElementById('cards-container');
//     if (!container) return;
//     container.innerHTML = cardData.map(card => `
//         <div class="card" onclick="openPlaylistByKey('${card.playlistKey}')">
//             <div class="card-image">
//                 <img src="${card.image}" alt="${card.title}" onerror="this.src='covers/1.jpg'">
//                 <div class="card-play"><i class="fa-solid fa-play"></i></div>
//             </div>
//             <h3>${card.title}</h3>
//             <p>${card.subtitle}</p>
//         </div>
//     `).join('');
// }

// function renderLibrary() { renderLibraryContent('songs'); }

// function renderLibraryContent(tabName) {
//     const container = document.getElementById('library-list');
//     if (!container) return;

//     switch (tabName) {
//         case 'songs':
//             container.innerHTML = allSongs.map(song => `
//                 <div class="library-item" onclick="playSong(${song.id})">
//                     <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
//                     <div class="item-info">
//                         <h4>${song.title}</h4>
//                         <p>${song.artist} • ${song.album}</p>
//                     </div>
//                     <span class="item-plays">${formatPlays(song.plays)}</span>
//                     <span class="item-duration">${song.duration}</span>
//                     <i class="fa-regular fa-heart item-like ${likedSongs.has(song.id) ? 'liked fa-solid' : ''}"
//                        onclick="event.stopPropagation(); toggleLikeSong(${song.id}, this)"></i>
//                 </div>
//             `).join('');
//             break;

//         case 'albums':
//             const albums = [...new Map(allSongs.map(s => [s.album, s])).values()];
//             container.innerHTML = albums.map(album => `
//                 <div class="library-item" onclick="openAlbum('${album.album}')">
//                     <img src="${album.image}" alt="${album.album}" onerror="this.src='covers/1.jpg'">
//                     <div class="item-info">
//                         <h4>${album.album}</h4>
//                         <p>Album • ${album.artist}</p>
//                     </div>
//                 </div>
//             `).join('');
//             break;

//         case 'artists':
//             const artists = [...new Map(allSongs.map(s => [s.artist, s])).values()];
//             container.innerHTML = artists.map(artist => `
//                 <div class="library-item" onclick="openArtist('${artist.artist}')">
//                     <img src="${artist.image}" alt="${artist.artist}" style="border-radius:50%;" onerror="this.src='covers/1.jpg'">
//                     <div class="item-info">
//                         <h4>${artist.artist}</h4>
//                         <p>Artist</p>
//                     </div>
//                 </div>
//             `).join('');
//             break;

//         case 'playlists':
//             container.innerHTML = Object.keys(playlists).map(key => `
//                 <div class="library-item" onclick="openPlaylistByKey('${key}')">
//                     <div class="playlist-icon"><i class="fa-solid fa-music"></i></div>
//                     <div class="item-info">
//                         <h4>${playlists[key].name}</h4>
//                         <p>Playlist • ${playlists[key].songs.length} songs</p>
//                     </div>
//                 </div>
//             `).join('');
//             break;
//     }
// }

// // ============================================
// // SEARCH — FIX: handleSearch moved to top level
// // ============================================

// let _searchTimeout;

// function handleSearch(e) {
//     clearTimeout(_searchTimeout);
//     _searchTimeout = setTimeout(() => searchSongs(e.target.value), 300);
// }

// function searchSongs(query) {
//     const container = document.getElementById('search-results');
//     if (!container) return;

//     if (!query.trim()) { container.innerHTML = ''; return; }

//     const results = allSongs.filter(s =>
//         s.title.toLowerCase().includes(query.toLowerCase()) ||
//         s.artist.toLowerCase().includes(query.toLowerCase()) ||
//         s.album.toLowerCase().includes(query.toLowerCase())
//     );

//     if (results.length === 0) {
//         container.innerHTML = `<p style="color:#b3b3b3;padding:20px;">No results found for "${query}"</p>`;
//         return;
//     }

//     container.innerHTML = results.map(song => `
//         <div class="card" onclick="playSong(${song.id})">
//             <div class="card-image">
//                 <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
//                 <div class="card-play"><i class="fa-solid fa-play"></i></div>
//             </div>
//             <h3>${song.title}</h3>
//             <p>${song.artist}</p>
//         </div>
//     `).join('');
// }

// function filterByCategory(category, e) {
//     document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
//     if (e && e.target) e.target.classList.add('active');

//     const container = document.getElementById('search-results');
//     if (!container) return;

//     // also clear the search input
//     const input = document.getElementById('search-input');
//     if (input) input.value = '';

//     if (category === 'all') { container.innerHTML = ''; return; }

//     const filtered = allSongs.filter(s => s.category === category);
//     container.innerHTML = filtered.map(song => `
//         <div class="card" onclick="playSong(${song.id})">
//             <div class="card-image">
//                 <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
//                 <div class="card-play"><i class="fa-solid fa-play"></i></div>
//             </div>
//             <h3>${song.title}</h3>
//             <p>${song.artist}</p>
//         </div>
//     `).join('');
// }

// function filterPlaylist(category) {
//     document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
//     const libSection = document.getElementById('library-section');
//     if (libSection) libSection.style.display = 'block';

//     const container = document.getElementById('library-list');
//     if (!container) return;

//     const songs = category === 'all' ? allSongs : allSongs.filter(s => s.category === category);
//     container.innerHTML = songs.map(song => `
//         <div class="library-item" onclick="playSong(${song.id})">
//             <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
//             <div class="item-info">
//                 <h4>${song.title}</h4>
//                 <p>${song.artist} • ${song.album}</p>
//             </div>
//             <span class="item-duration">${song.duration}</span>
//         </div>
//     `).join('');
// }

// // ============================================
// // AUDIO PLAYER
// // ============================================

// function playSong(songId) {
//     const song = allSongs.find(s => s.id === songId);
//     if (!song) return;

//     currentSongIndex = allSongs.findIndex(s => s.id === songId);
//     if (currentPlaylist.length === 0) currentPlaylist = [...allSongs];

//     audio.pause();
//     audio.currentTime = 0;
//     audio.src = song.audio;
//     audio.load();

//     const titleEl  = document.getElementById('current-title');
//     const artistEl = document.getElementById('current-artist');
//     const imgEl    = document.getElementById('current-art');

//     if (titleEl)  titleEl.textContent  = song.title;
//     if (artistEl) artistEl.textContent = song.artist;
//     if (imgEl) {
//         imgEl.src = song.image;
//         imgEl.onerror = () => { imgEl.src = 'covers/1.jpg'; };
//     }

//     // Update like icon in player bar
//     const likeIcon = document.querySelector('.player-bar .like-icon');
//     if (likeIcon) {
//         likeIcon.className = likedSongs.has(song.id)
//             ? 'fa-solid fa-heart like-icon liked'
//             : 'fa-regular fa-heart like-icon';
//     }

//     audio.play()
//         .then(() => { isPlaying = true; updatePlayButton(); })
//         .catch(() => { showNotification('Click play to start audio'); });

//     addToRecentlyPlayed(song);
//     updateQueueDisplay();
// }

// function togglePlay() {
//     if (!audio.src || audio.src === window.location.href) {
//         if (allSongs.length > 0) { currentPlaylist = [...allSongs]; playSong(allSongs[0].id); }
//         return;
//     }
//     if (isPlaying) {
//         audio.pause();
//         isPlaying = false;
//     } else {
//         audio.play().catch(() => showNotification('Click again to play'));
//         isPlaying = true;
//     }
//     updatePlayButton();
// }

// function updatePlayButton() {
//     const btn = document.getElementById('play-btn');
//     if (btn) {
//         const icon = btn.querySelector('i');
//         if (icon) icon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
//     }
// }

// function playNext() {
//     if (currentPlaylist.length === 0) return;

//     if (isShuffle) {
//         let newIndex;
//         do { newIndex = Math.floor(Math.random() * currentPlaylist.length); }
//         while (newIndex === currentSongIndex && currentPlaylist.length > 1);
//         currentSongIndex = newIndex;
//     } else {
//         currentSongIndex++;
//         if (currentSongIndex >= currentPlaylist.length) {
//             if (repeatMode === 'all') { currentSongIndex = 0; }
//             else {
//                 currentSongIndex = currentPlaylist.length - 1;
//                 audio.pause(); isPlaying = false; updatePlayButton(); return;
//             }
//         }
//     }
//     playSong(currentPlaylist[currentSongIndex].id);
// }

// function playPrev() {
//     if (currentPlaylist.length === 0) return;
//     if (audio.currentTime > 3) { audio.currentTime = 0; return; }

//     if (isShuffle) {
//         let newIndex;
//         do { newIndex = Math.floor(Math.random() * currentPlaylist.length); }
//         while (newIndex === currentSongIndex && currentPlaylist.length > 1);
//         currentSongIndex = newIndex;
//     } else {
//         currentSongIndex--;
//         if (currentSongIndex < 0) {
//             currentSongIndex = repeatMode === 'all' ? currentPlaylist.length - 1 : 0;
//         }
//     }
//     playSong(currentPlaylist[currentSongIndex].id);
// }

// function toggleShuffle() {
//     isShuffle = !isShuffle;
//     const btn = document.getElementById('shuffle-btn');
//     if (btn) btn.style.color = isShuffle ? '#1db954' : '';
//     showNotification(isShuffle ? 'Shuffle on' : 'Shuffle off');
// }

// function toggleRepeat() {
//     const btn = document.getElementById('repeat-btn');
//     if (repeatMode === 'none') {
//         repeatMode = 'all';
//         if (btn) { btn.innerHTML = '<i class="fa-solid fa-repeat"></i>'; btn.style.color = '#1db954'; }
//         showNotification('Repeat all');
//     } else if (repeatMode === 'all') {
//         repeatMode = 'one';
//         if (btn) {
//             btn.style.color = '#1db954';
//             btn.style.position = 'relative';
//             btn.innerHTML = '<i class="fa-solid fa-repeat" style="color:#1db954"></i><span style="font-size:8px;color:#1db954;position:absolute;bottom:-4px;left:50%;transform:translateX(-50%)">1</span>';
//         }
//         showNotification('Repeat one');
//     } else {
//         repeatMode = 'none';
//         if (btn) { btn.innerHTML = '<i class="fa-solid fa-repeat"></i>'; btn.style.color = ''; }
//         showNotification('Repeat off');
//     }
// }

// // ============================================
// // PROGRESS BAR
// // ============================================

// function updateProgressBar() {
//     if (!audio.duration) return;
//     const progress = (audio.currentTime / audio.duration) * 100;
//     const bar = document.querySelector('.progress-bar .progress');
//     if (bar) bar.style.width = progress + '%';
//     const curr = document.getElementById('curr-time');
//     const dur  = document.getElementById('dur-time');
//     if (curr) curr.textContent = formatTime(audio.currentTime);
//     if (dur)  dur.textContent  = formatTime(audio.duration);
// }

// function seekTo(event) {
//     const progressBar = document.getElementById('progress-bar');
//     if (!progressBar || !audio.duration) return;
//     const rect  = progressBar.getBoundingClientRect();
//     const ratio = (event.clientX - rect.left) / rect.width;
//     audio.currentTime = ratio * audio.duration;
// }

// // ============================================
// // VOLUME
// // ============================================

// function setVolume(value) {
//     audio.volume = value / 100;
//     const icon = document.querySelector('.volume-controls .fa-volume-high, .volume-controls .fa-volume-low, .volume-controls .fa-volume-xmark');
//     if (!icon) return;
//     if (value == 0)     icon.className = 'fa-solid fa-volume-xmark';
//     else if (value < 50) icon.className = 'fa-solid fa-volume-low';
//     else                 icon.className = 'fa-solid fa-volume-high';
// }

// // ============================================
// // LIKE FUNCTIONS
// // ============================================

// function toggleLike(iconEl) {
//     const song = currentPlaylist[currentSongIndex] || allSongs[currentSongIndex];
//     if (!song) return;
//     if (likedSongs.has(song.id)) {
//         likedSongs.delete(song.id);
//         iconEl.className = 'fa-regular fa-heart like-icon';
//         showNotification('Removed from Liked Songs');
//     } else {
//         likedSongs.add(song.id);
//         iconEl.className = 'fa-solid fa-heart like-icon liked';
//         showNotification('Added to Liked Songs');
//     }
//     saveLikedSongs();
// }

// function toggleLikeSong(songId, iconEl) {
//     if (likedSongs.has(songId)) {
//         likedSongs.delete(songId);
//         if (iconEl) iconEl.className = 'fa-regular fa-heart item-like';
//         showNotification('Removed from Liked Songs');
//     } else {
//         likedSongs.add(songId);
//         if (iconEl) iconEl.className = 'fa-solid fa-heart item-like liked';
//         showNotification('Added to Liked Songs');
//     }
//     saveLikedSongs();
// }

// function saveLikedSongs() {
//     try { localStorage.setItem('likedSongs', JSON.stringify([...likedSongs])); } catch (e) {}
// }

// function loadLikedSongs() {
//     try {
//         const saved = localStorage.getItem('likedSongs');
//         if (saved) likedSongs = new Set(JSON.parse(saved));
//     } catch (e) {}
// }

// // ============================================
// // RECENTLY PLAYED
// // ============================================

// function addToRecentlyPlayed(song) {
//     recentlyPlayed = recentlyPlayed.filter(s => s.id !== song.id);
//     recentlyPlayed.unshift(song);
//     if (recentlyPlayed.length > 20) recentlyPlayed = recentlyPlayed.slice(0, 20);
//     try { localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed)); } catch (e) {}
//     renderRecentlyPlayed();
// }

// // ============================================
// // QUEUE
// // ============================================

// function toggleQueue() {
//     const panel = document.getElementById('queue-panel');
//     if (!panel) return;
//     if (panel.classList.contains('open')) {
//         panel.classList.remove('open');
//     } else {
//         panel.classList.add('open');
//         updateQueueDisplay();
//     }
// }

// function updateQueueDisplay() {
//     const queueList = document.getElementById('queue-list');
//     if (!queueList) return;
//     const upNext = currentPlaylist.slice(currentSongIndex + 1, currentSongIndex + 6);
//     if (upNext.length === 0) {
//         queueList.innerHTML = '<p style="color:#b3b3b3;padding:20px;">No songs in queue</p>';
//         return;
//     }
//     queueList.innerHTML = upNext.map(song => `
//         <div class="queue-item" onclick="playSong(${song.id})">
//             <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'"
//                  style="width:40px;height:40px;border-radius:4px;object-fit:cover;">
//             <div style="flex:1;overflow:hidden;">
//                 <p style="margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${song.title}</p>
//                 <p style="margin:0;font-size:12px;color:#b3b3b3;">${song.artist}</p>
//             </div>
//             <span style="font-size:12px;color:#b3b3b3;">${song.duration}</span>
//         </div>
//     `).join('');
// }

// // ============================================
// // PLAYLIST / ALBUM / ARTIST — FIX: use key
// // ============================================

// // FIX: primary function now works by playlist KEY (all, chill, energetic, workout, focus)
// function openPlaylistByKey(key) {
//     const pl = playlists[key];
//     if (!pl || pl.songs.length === 0) return;
//     currentPlaylist = [...pl.songs];
//     currentSongIndex = 0;
//     playSong(currentPlaylist[0].id);
//     showNotification('Playing: ' + pl.name);
// }

// // Keep old name working too (used by sidebar)
// function openPlaylist(name) {
//     const key = Object.keys(playlists).find(k => playlists[k].name === name);
//     if (key) { openPlaylistByKey(key); } else { showNotification('Opening: ' + name); }
// }

// function openAlbum(albumName) {
//     const songs = allSongs.filter(s => s.album === albumName);
//     if (songs.length > 0) {
//         currentPlaylist = songs;
//         currentSongIndex = 0;
//         playSong(songs[0].id);
//         showNotification('Playing album: ' + albumName);
//     }
// }

// function openArtist(artistName) {
//     const songs = allSongs.filter(s => s.artist === artistName);
//     if (songs.length > 0) {
//         currentPlaylist = songs;
//         currentSongIndex = 0;
//         playSong(songs[0].id);
//         showNotification('Playing: ' + artistName);
//     }
// }

// // ============================================
// // EVENT LISTENERS
// // ============================================

// function setupEventListeners() {
//     audio.addEventListener('timeupdate', updateProgressBar);

//     audio.addEventListener('ended', function () {
//         if (repeatMode === 'one') { audio.currentTime = 0; audio.play(); }
//         else playNext();
//     });

//     audio.addEventListener('error', function () {
//         showNotification('Audio error. Skipping...');
//         setTimeout(playNext, 1000);
//     });

//     const progressBar = document.getElementById('progress-bar');
//     if (progressBar) progressBar.addEventListener('click', seekTo);

//     const volumeSlider = document.getElementById('volume-slider');
//     if (volumeSlider) volumeSlider.addEventListener('input', function () { setVolume(this.value); });

//     const nextBtn = document.getElementById('next');
//     if (nextBtn) nextBtn.addEventListener('click', playNext);

//     const prevBtn = document.getElementById('prev');
//     if (prevBtn) prevBtn.addEventListener('click', playPrev);
// }

// // ============================================
// // KEYBOARD SHORTCUTS
// // ============================================

// function setupKeyboardShortcuts() {
//     document.addEventListener('keydown', function (e) {
//         if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

//         switch (e.code) {
//             case 'Space':
//                 e.preventDefault(); togglePlay(); break;
//             case 'ArrowRight':
//                 if (e.altKey) { e.preventDefault(); playNext(); } break;
//             case 'ArrowLeft':
//                 if (e.altKey) { e.preventDefault(); playPrev(); } break;
//             case 'ArrowUp':
//                 e.preventDefault();
//                 const vs1 = document.getElementById('volume-slider');
//                 if (vs1) { vs1.value = Math.min(100, parseInt(vs1.value) + 10); setVolume(vs1.value); }
//                 break;
//             case 'ArrowDown':
//                 e.preventDefault();
//                 const vs2 = document.getElementById('volume-slider');
//                 if (vs2) { vs2.value = Math.max(0, parseInt(vs2.value) - 10); setVolume(vs2.value); }
//                 break;
//             case 'KeyS':
//                 if (e.ctrlKey || e.metaKey) { e.preventDefault(); toggleShuffle(); } break;
//             case 'KeyR':
//                 if (e.ctrlKey || e.metaKey) { e.preventDefault(); toggleRepeat(); } break;
//         }
//     });
// }

// // ============================================
// // NOTIFICATION
// // ============================================

// function showNotification(message) {
//     const existing = document.querySelector('.notification');
//     if (existing) existing.remove();

//     const notif = document.createElement('div');
//     notif.className = 'notification';
//     notif.textContent = message;
//     notif.style.cssText = `
//         position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
//         background:#1db954; color:#000; padding:10px 20px; border-radius:25px;
//         font-size:14px; font-weight:600; z-index:9999;
//         animation:fadeInOut 2.5s ease forwards; pointer-events:none; white-space:nowrap;`;

//     if (!document.getElementById('notif-style')) {
//         const style = document.createElement('style');
//         style.id = 'notif-style';
//         style.textContent = `
//             @keyframes fadeInOut {
//                 0%   { opacity:0; transform:translateX(-50%) translateY(10px); }
//                 15%  { opacity:1; transform:translateX(-50%) translateY(0); }
//                 75%  { opacity:1; }
//                 100% { opacity:0; transform:translateX(-50%) translateY(-10px); }
//             }
//             .liked { color:#1db954 !important; }
//             .queue-item { display:flex; align-items:center; gap:12px; padding:10px 16px;
//                           cursor:pointer; border-radius:4px; transition:background 0.2s; }
//             .queue-item:hover { background:rgba(255,255,255,0.1); }
//             .queue-panel.open { right:0 !important; }`;
//         document.head.appendChild(style);
//     }

//     document.body.appendChild(notif);
//     setTimeout(() => { if (notif.parentNode) notif.remove(); }, 2500);
// }

// // ============================================
// // UTILITIES
// // ============================================

// function formatTime(seconds) {
//     if (isNaN(seconds) || seconds === Infinity) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
// }

// function formatPlays(num) {
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
//     if (num >= 1000)    return (num / 1000).toFixed(1) + 'K';
//     return num.toString();
// }


// Global Variables
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 'none'; // 'none', 'all', 'one'
let isLoggedIn = false;
let currentPlaylist = [];
let likedSongs = new Set();
let currentUser = null;

// Audio Element
const audio = document.getElementById('audio');

// ============================================
// SONG DATA — uses LOCAL files
// covers/1.jpg … covers/10.jpg
// songs/1.mp3  … songs/10.mp3
// ============================================
const allSongs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        category: "energetic",
        duration: "3:20",
        image: "covers/1.jpg",
        audio: "songs/1.mp3",
        plays: 4500000
    },
    {
        id: 2,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        category: "energetic",
        duration: "3:23",
        image: "covers/2.jpg",
        audio: "songs/2.mp3",
        plays: 3800000
    },
    {
        id: 3,
        title: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        category: "chill",
        duration: "2:54",
        image: "covers/3.jpg",
        audio: "songs/3.mp3",
        plays: 3200000
    },
    {
        id: 4,
        title: "Dynamite",
        artist: "BTS",
        album: "BE",
        category: "energetic",
        duration: "3:19",
        image: "covers/4.jpg",
        audio: "songs/4.mp3",
        plays: 5100000
    },
    {
        id: 5,
        title: "Lo-Fi Dreams",
        artist: "Chill Vibes",
        album: "Relaxation",
        category: "chill",
        duration: "2:45",
        image: "covers/5.jpg",
        audio: "songs/5.mp3",
        plays: 2100000
    },
    {
        id: 6,
        title: "Power Workout",
        artist: "Gym Beats",
        album: "Fitness Mix",
        category: "workout",
        duration: "3:10",
        image: "covers/6.jpg",
        audio: "songs/6.mp3",
        plays: 1800000
    },
    {
        id: 7,
        title: "Focus Flow",
        artist: "Study Music",
        album: "Concentration",
        category: "focus",
        duration: "4:05",
        image: "covers/7.jpg",
        audio: "songs/7.mp3",
        plays: 2900000
    },
    {
        id: 8,
        title: "Top Hits 2024",
        artist: "Various Artists",
        album: "Best of 2024",
        category: "energetic",
        duration: "3:33",
        image: "covers/8.jpg",
        audio: "songs/8.mp3",
        plays: 5500000
    },
    {
        id: 9,
        title: "Sunset Chill",
        artist: "Lofi Beats",
        album: "Evening Vibes",
        category: "chill",
        duration: "2:58",
        image: "covers/9.jpg",
        audio: "songs/9.mp3",
        plays: 1650000
    },
    {
        id: 10,
        title: "Beast Mode",
        artist: "Workout Music",
        album: "Gym Anthems",
        category: "workout",
        duration: "3:42",
        image: "covers/10.jpg",
        audio: "songs/10.mp3",
        plays: 2200000
    }
];

// Playlist Data
const playlists = {
    all:       { name: "All Songs",       songs: [...allSongs] },
    chill:     { name: "Lo-Fi Beats",     songs: allSongs.filter(s => s.category === "chill") },
    energetic: { name: "Top Hits 2024",   songs: allSongs.filter(s => s.category === "energetic") },
    workout:   { name: "Gym Motivation",  songs: allSongs.filter(s => s.category === "workout") },
    focus:     { name: "Focus Flow",      songs: allSongs.filter(s => s.category === "focus") }
};

// "Made For You" cards — each maps to a playlist key so clicking plays music
const cardData = [
    { title: "Daily Mix 1",      subtitle: "Made for You",        playlistKey: "energetic", image: "covers/1.jpg" },
    { title: "Daily Mix 2",      subtitle: "Made for You",        playlistKey: "chill",     image: "covers/2.jpg" },
    { title: "Discover Weekly",  subtitle: "Your weekly mixtape", playlistKey: "all",       image: "covers/3.jpg" },
    { title: "Release Radar",    subtitle: "New music for you",   playlistKey: "energetic", image: "covers/4.jpg" },
    { title: "On Repeat",        subtitle: "Songs you love",      playlistKey: "chill",     image: "covers/5.jpg" },
    { title: "Wrapped",          subtitle: "Your year in music",  playlistKey: "all",       image: "covers/6.jpg" }
];

// Recently Played
let recentlyPlayed = [];
try { recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || []; } catch (e) { recentlyPlayed = []; }

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    loadUserSession();
    loadLikedSongs();
    loadRecentlyPlayed();
    renderRecentlyPlayed();
    renderCards();
    renderLibrary();
    setupEventListeners();
    setupKeyboardShortcuts();

    if (!isLoggedIn) {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) loginModal.style.display = 'flex';
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

function switchModal(fromModal, toModal) {
    closeModal(fromModal);
    setTimeout(() => openModal(toModal), 200);
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// ============================================
// AUTHENTICATION
// ============================================

function handleLogin(event) {
    event.preventDefault();
    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password.length >= 6) {
        isLoggedIn  = true;
        currentUser = {
            name:      email.split('@')[0],
            email:     email,
            followers: Math.floor(Math.random() * 1000),
            following: Math.floor(Math.random() * 500)
        };
        try { localStorage.setItem('currentUser', JSON.stringify(currentUser)); } catch (e) {}
        closeModal('login-modal');
        updateUIForLoggedInUser();
        showNotification('Welcome back, ' + currentUser.name + '!');
    } else {
        showNotification('Please enter valid credentials');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const email        = document.getElementById('signup-email').value;
    const confirmEmail = document.getElementById('signup-confirm-email').value;
    const password     = document.getElementById('signup-password').value;
    const name         = document.getElementById('signup-name').value;

    if (email !== confirmEmail) { showNotification('Emails do not match'); return; }
    if (password.length < 6)   { showNotification('Password must be at least 6 characters'); return; }

    isLoggedIn  = true;
    currentUser = { name, email, followers: 0, following: 0 };
    try { localStorage.setItem('currentUser', JSON.stringify(currentUser)); } catch (e) {}
    closeModal('signup-modal');
    updateUIForLoggedInUser();
    showNotification('Welcome to Spotify, ' + name + '!');
}

function handleLogout() {
    isLoggedIn  = false;
    currentUser = null;
    try { localStorage.removeItem('currentUser'); } catch (e) {}
    closeModal('profile-modal');
    updateUIForLoggedOutUser();
    showNotification('You have been logged out');
}

function loadUserSession() {
    try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            isLoggedIn  = true;
            updateUIForLoggedInUser();
        }
    } catch (e) {}
}

function updateUIForLoggedInUser() {
    const area = document.getElementById('user-profile-area');
    if (area && currentUser) {
        area.innerHTML = `
            <button class="user-btn" onclick="openModal('profile-modal')">
                <i class="fa-solid fa-user"></i>
                <span>${currentUser.name}</span>
            </button>`;
    }
    const profileName = document.getElementById('profile-name');
    if (profileName && currentUser) profileName.textContent = currentUser.name;
}

function updateUIForLoggedOutUser() {
    const area = document.getElementById('user-profile-area');
    if (area) {
        area.innerHTML = `
            <button class="sign-up" onclick="openModal('signup-modal')">Sign Up</button>
            <button class="log-in"  onclick="openModal('login-modal')">Log In</button>`;
    }
}

// ============================================
// NAVIGATION
// ============================================

function showSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    const sel = document.getElementById(sectionName + '-section');
    if (sel) sel.style.display = 'block';

    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    // highlight the matching nav item
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('data-section') === sectionName) {
            a.closest('li').classList.add('active');
        }
    });
}

function showLibraryTab(tabName, btn) {
    document.querySelectorAll('.library-tab').forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderLibraryContent(tabName);
}

// ============================================
// RENDERING
// ============================================

function loadRecentlyPlayed() {
    try { recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || []; } catch (e) { recentlyPlayed = []; }
}

function renderRecentlyPlayed() {
    const container = document.getElementById('recently-played');
    if (!container) return;
    const source = recentlyPlayed.length > 0 ? recentlyPlayed.slice(0, 6) : allSongs.slice(0, 6);
    container.innerHTML = source.map(song => `
        <div class="recent-item" onclick="playSong(${song.id})">
            <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
            <span>${song.title}</span>
            <i class="fa-solid fa-play play-icon"></i>
        </div>
    `).join('');
}

// FIX: Cards now carry a playlistKey so clicking actually plays music
function renderCards() {
    const container = document.getElementById('cards-container');
    if (!container) return;
    container.innerHTML = cardData.map(card => `
        <div class="card" onclick="openPlaylistByKey('${card.playlistKey}')">
            <div class="card-image">
                <img src="${card.image}" alt="${card.title}" onerror="this.src='covers/1.jpg'">
                <div class="card-play"><i class="fa-solid fa-play"></i></div>
            </div>
            <h3>${card.title}</h3>
            <p>${card.subtitle}</p>
        </div>
    `).join('');
}

function renderLibrary() { renderLibraryContent('songs'); }

function renderLibraryContent(tabName) {
    const container = document.getElementById('library-list');
    if (!container) return;

    switch (tabName) {
        case 'songs':
            container.innerHTML = allSongs.map(song => `
                <div class="library-item" onclick="playSong(${song.id})">
                    <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
                    <div class="item-info">
                        <h4>${song.title}</h4>
                        <p>${song.artist} • ${song.album}</p>
                    </div>
                    <span class="item-plays">${formatPlays(song.plays)}</span>
                    <span class="item-duration">${song.duration}</span>
                    <i class="fa-regular fa-heart item-like ${likedSongs.has(song.id) ? 'liked fa-solid' : ''}"
                       onclick="event.stopPropagation(); toggleLikeSong(${song.id}, this)"></i>
                </div>
            `).join('');
            break;

        case 'albums':
            const albums = [...new Map(allSongs.map(s => [s.album, s])).values()];
            container.innerHTML = albums.map(album => `
                <div class="library-item" onclick="openAlbum('${album.album}')">
                    <img src="${album.image}" alt="${album.album}" onerror="this.src='covers/1.jpg'">
                    <div class="item-info">
                        <h4>${album.album}</h4>
                        <p>Album • ${album.artist}</p>
                    </div>
                </div>
            `).join('');
            break;

        case 'artists':
            const artists = [...new Map(allSongs.map(s => [s.artist, s])).values()];
            container.innerHTML = artists.map(artist => `
                <div class="library-item" onclick="openArtist('${artist.artist}')">
                    <img src="${artist.image}" alt="${artist.artist}" style="border-radius:50%;" onerror="this.src='covers/1.jpg'">
                    <div class="item-info">
                        <h4>${artist.artist}</h4>
                        <p>Artist</p>
                    </div>
                </div>
            `).join('');
            break;

        case 'playlists':
            container.innerHTML = Object.keys(playlists).map(key => `
                <div class="library-item" onclick="openPlaylistByKey('${key}')">
                    <div class="playlist-icon"><i class="fa-solid fa-music"></i></div>
                    <div class="item-info">
                        <h4>${playlists[key].name}</h4>
                        <p>Playlist • ${playlists[key].songs.length} songs</p>
                    </div>
                </div>
            `).join('');
            break;
    }
}

// ============================================
// SEARCH — FIX: handleSearch moved to top level
// ============================================

let _searchTimeout;

function handleSearch(e) {
    clearTimeout(_searchTimeout);
    _searchTimeout = setTimeout(() => searchSongs(e.target.value), 300);
}

function searchSongs(query) {
    const container = document.getElementById('search-results');
    if (!container) return;

    if (!query.trim()) { container.innerHTML = ''; return; }

    const results = allSongs.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase()) ||
        s.album.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        container.innerHTML = `<p style="color:#b3b3b3;padding:20px;">No results found for "${query}"</p>`;
        return;
    }

    container.innerHTML = results.map(song => `
        <div class="card" onclick="playSong(${song.id})">
            <div class="card-image">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
                <div class="card-play"><i class="fa-solid fa-play"></i></div>
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        </div>
    `).join('');
}

function filterByCategory(category, e) {
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    if (e && e.target) e.target.classList.add('active');

    const container = document.getElementById('search-results');
    if (!container) return;

    // also clear the search input
    const input = document.getElementById('search-input');
    if (input) input.value = '';

    if (category === 'all') { container.innerHTML = ''; return; }

    const filtered = allSongs.filter(s => s.category === category);
    container.innerHTML = filtered.map(song => `
        <div class="card" onclick="playSong(${song.id})">
            <div class="card-image">
                <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
                <div class="card-play"><i class="fa-solid fa-play"></i></div>
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        </div>
    `).join('');
}

function filterPlaylist(category) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    const libSection = document.getElementById('library-section');
    if (libSection) libSection.style.display = 'block';

    const container = document.getElementById('library-list');
    if (!container) return;

    const songs = category === 'all' ? allSongs : allSongs.filter(s => s.category === category);
    container.innerHTML = songs.map(song => `
        <div class="library-item" onclick="playSong(${song.id})">
            <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'">
            <div class="item-info">
                <h4>${song.title}</h4>
                <p>${song.artist} • ${song.album}</p>
            </div>
            <span class="item-duration">${song.duration}</span>
        </div>
    `).join('');
}

// ============================================
// AUDIO PLAYER
// ============================================

function playSong(songId) {
    const song = allSongs.find(s => s.id === songId);
    if (!song) return;

    currentSongIndex = allSongs.findIndex(s => s.id === songId);
    if (currentPlaylist.length === 0) currentPlaylist = [...allSongs];

    audio.pause();
    audio.currentTime = 0;
    audio.src = song.audio;
    audio.load();

    const titleEl  = document.getElementById('current-title');
    const artistEl = document.getElementById('current-artist');
    const imgEl    = document.getElementById('current-art');

    if (titleEl)  titleEl.textContent  = song.title;
    if (artistEl) artistEl.textContent = song.artist;
    if (imgEl) {
        imgEl.src = song.image;
        imgEl.onerror = () => { imgEl.src = 'covers/1.jpg'; };
    }

    // Update like icon in player bar
    const likeIcon = document.querySelector('.player-bar .like-icon');
    if (likeIcon) {
        likeIcon.className = likedSongs.has(song.id)
            ? 'fa-solid fa-heart like-icon liked'
            : 'fa-regular fa-heart like-icon';
    }

    audio.play()
        .then(() => { isPlaying = true; updatePlayButton(); })
        .catch(() => { showNotification('Click play to start audio'); });

    addToRecentlyPlayed(song);
    updateQueueDisplay();
}

function togglePlay() {
    if (!audio.src || audio.src === window.location.href) {
        if (allSongs.length > 0) { currentPlaylist = [...allSongs]; playSong(allSongs[0].id); }
        return;
    }
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().catch(() => showNotification('Click again to play'));
        isPlaying = true;
    }
    updatePlayButton();
}

function updatePlayButton() {
    const btn = document.getElementById('play-btn');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) icon.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
}

function playNext() {
    if (currentPlaylist.length === 0) return;

    if (isShuffle) {
        let newIndex;
        do { newIndex = Math.floor(Math.random() * currentPlaylist.length); }
        while (newIndex === currentSongIndex && currentPlaylist.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex++;
        if (currentSongIndex >= currentPlaylist.length) {
            if (repeatMode === 'all') { currentSongIndex = 0; }
            else {
                currentSongIndex = currentPlaylist.length - 1;
                audio.pause(); isPlaying = false; updatePlayButton(); return;
            }
        }
    }
    playSong(currentPlaylist[currentSongIndex].id);
}

function playPrev() {
    if (currentPlaylist.length === 0) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }

    if (isShuffle) {
        let newIndex;
        do { newIndex = Math.floor(Math.random() * currentPlaylist.length); }
        while (newIndex === currentSongIndex && currentPlaylist.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = repeatMode === 'all' ? currentPlaylist.length - 1 : 0;
        }
    }
    playSong(currentPlaylist[currentSongIndex].id);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    const btn = document.getElementById('shuffle-btn');
    if (btn) btn.style.color = isShuffle ? '#1db954' : '';
    showNotification(isShuffle ? 'Shuffle on' : 'Shuffle off');
}

function toggleRepeat() {
    const btn = document.getElementById('repeat-btn');
    if (repeatMode === 'none') {
        repeatMode = 'all';
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-repeat"></i>'; btn.style.color = '#1db954'; }
        showNotification('Repeat all');
    } else if (repeatMode === 'all') {
        repeatMode = 'one';
        if (btn) {
            btn.style.color = '#1db954';
            btn.style.position = 'relative';
            btn.innerHTML = '<i class="fa-solid fa-repeat" style="color:#1db954"></i><span style="font-size:8px;color:#1db954;position:absolute;bottom:-4px;left:50%;transform:translateX(-50%)">1</span>';
        }
        showNotification('Repeat one');
    } else {
        repeatMode = 'none';
        if (btn) { btn.innerHTML = '<i class="fa-solid fa-repeat"></i>'; btn.style.color = ''; }
        showNotification('Repeat off');
    }
}

// ============================================
// PROGRESS BAR
// ============================================

function updateProgressBar() {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    const bar = document.querySelector('.progress-bar .progress');
    if (bar) bar.style.width = progress + '%';
    const curr = document.getElementById('curr-time');
    const dur  = document.getElementById('dur-time');
    if (curr) curr.textContent = formatTime(audio.currentTime);
    if (dur)  dur.textContent  = formatTime(audio.duration);
}

function seekTo(event) {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar || !audio.duration) return;
    const rect  = progressBar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
}

// ============================================
// VOLUME
// ============================================

function setVolume(value) {
    audio.volume = value / 100;
    const icon = document.querySelector('.volume-controls .fa-volume-high, .volume-controls .fa-volume-low, .volume-controls .fa-volume-xmark');
    if (!icon) return;
    if (value == 0)     icon.className = 'fa-solid fa-volume-xmark';
    else if (value < 50) icon.className = 'fa-solid fa-volume-low';
    else                 icon.className = 'fa-solid fa-volume-high';
}

// ============================================
// LIKE FUNCTIONS
// ============================================

function toggleLike(iconEl) {
    const song = currentPlaylist[currentSongIndex] || allSongs[currentSongIndex];
    if (!song) return;
    if (likedSongs.has(song.id)) {
        likedSongs.delete(song.id);
        iconEl.className = 'fa-regular fa-heart like-icon';
        showNotification('Removed from Liked Songs');
    } else {
        likedSongs.add(song.id);
        iconEl.className = 'fa-solid fa-heart like-icon liked';
        showNotification('Added to Liked Songs');
    }
    saveLikedSongs();
}

function toggleLikeSong(songId, iconEl) {
    if (likedSongs.has(songId)) {
        likedSongs.delete(songId);
        if (iconEl) iconEl.className = 'fa-regular fa-heart item-like';
        showNotification('Removed from Liked Songs');
    } else {
        likedSongs.add(songId);
        if (iconEl) iconEl.className = 'fa-solid fa-heart item-like liked';
        showNotification('Added to Liked Songs');
    }
    saveLikedSongs();
}

function saveLikedSongs() {
    try { localStorage.setItem('likedSongs', JSON.stringify([...likedSongs])); } catch (e) {}
}

function loadLikedSongs() {
    try {
        const saved = localStorage.getItem('likedSongs');
        if (saved) likedSongs = new Set(JSON.parse(saved));
    } catch (e) {}
}

// ============================================
// RECENTLY PLAYED
// ============================================

function addToRecentlyPlayed(song) {
    recentlyPlayed = recentlyPlayed.filter(s => s.id !== song.id);
    recentlyPlayed.unshift(song);
    if (recentlyPlayed.length > 20) recentlyPlayed = recentlyPlayed.slice(0, 20);
    try { localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed)); } catch (e) {}
    renderRecentlyPlayed();
}

// ============================================
// QUEUE
// ============================================

function toggleQueue() {
    const panel = document.getElementById('queue-panel');
    if (!panel) return;
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
    } else {
        panel.classList.add('open');
        updateQueueDisplay();
    }
}

function updateQueueDisplay() {
    const queueList = document.getElementById('queue-list');
    if (!queueList) return;
    const upNext = currentPlaylist.slice(currentSongIndex + 1, currentSongIndex + 6);
    if (upNext.length === 0) {
        queueList.innerHTML = '<p style="color:#b3b3b3;padding:20px;">No songs in queue</p>';
        return;
    }
    queueList.innerHTML = upNext.map(song => `
        <div class="queue-item" onclick="playSong(${song.id})">
            <img src="${song.image}" alt="${song.title}" onerror="this.src='covers/1.jpg'"
                 style="width:40px;height:40px;border-radius:4px;object-fit:cover;">
            <div style="flex:1;overflow:hidden;">
                <p style="margin:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${song.title}</p>
                <p style="margin:0;font-size:12px;color:#b3b3b3;">${song.artist}</p>
            </div>
            <span style="font-size:12px;color:#b3b3b3;">${song.duration}</span>
        </div>
    `).join('');
}

// ============================================
// PLAYLIST / ALBUM / ARTIST — FIX: use key
// ============================================

// FIX: primary function now works by playlist KEY (all, chill, energetic, workout, focus)
function openPlaylistByKey(key) {
    const pl = playlists[key];
    if (!pl || pl.songs.length === 0) return;
    currentPlaylist = [...pl.songs];
    currentSongIndex = 0;
    playSong(currentPlaylist[0].id);
    showNotification('Playing: ' + pl.name);
}

// Keep old name working too (used by sidebar)
function openPlaylist(name) {
    const key = Object.keys(playlists).find(k => playlists[k].name === name);
    if (key) { openPlaylistByKey(key); } else { showNotification('Opening: ' + name); }
}

function openAlbum(albumName) {
    const songs = allSongs.filter(s => s.album === albumName);
    if (songs.length > 0) {
        currentPlaylist = songs;
        currentSongIndex = 0;
        playSong(songs[0].id);
        showNotification('Playing album: ' + albumName);
    }
}

function openArtist(artistName) {
    const songs = allSongs.filter(s => s.artist === artistName);
    if (songs.length > 0) {
        currentPlaylist = songs;
        currentSongIndex = 0;
        playSong(songs[0].id);
        showNotification('Playing: ' + artistName);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    audio.addEventListener('timeupdate', updateProgressBar);

    audio.addEventListener('ended', function () {
        if (repeatMode === 'one') { audio.currentTime = 0; audio.play(); }
        else playNext();
    });

    audio.addEventListener('error', function () {
        showNotification('Audio error. Skipping...');
        setTimeout(playNext, 1000);
    });

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.addEventListener('click', seekTo);

    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) volumeSlider.addEventListener('input', function () { setVolume(this.value); });

    const nextBtn = document.getElementById('next');
    if (nextBtn) nextBtn.addEventListener('click', playNext);

    const prevBtn = document.getElementById('prev');
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault(); togglePlay(); break;
            case 'ArrowRight':
                if (e.altKey) { e.preventDefault(); playNext(); } break;
            case 'ArrowLeft':
                if (e.altKey) { e.preventDefault(); playPrev(); } break;
            case 'ArrowUp':
                e.preventDefault();
                const vs1 = document.getElementById('volume-slider');
                if (vs1) { vs1.value = Math.min(100, parseInt(vs1.value) + 10); setVolume(vs1.value); }
                break;
            case 'ArrowDown':
                e.preventDefault();
                const vs2 = document.getElementById('volume-slider');
                if (vs2) { vs2.value = Math.max(0, parseInt(vs2.value) - 10); setVolume(vs2.value); }
                break;
            case 'KeyS':
                if (e.ctrlKey || e.metaKey) { e.preventDefault(); toggleShuffle(); } break;
            case 'KeyR':
                if (e.ctrlKey || e.metaKey) { e.preventDefault(); toggleRepeat(); } break;
        }
    });
}

// ============================================
// NOTIFICATION
// ============================================

function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.cssText = `
        position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
        background:#1db954; color:#000; padding:10px 20px; border-radius:25px;
        font-size:14px; font-weight:600; z-index:9999;
        animation:fadeInOut 2.5s ease forwards; pointer-events:none; white-space:nowrap;`;

    if (!document.getElementById('notif-style')) {
        const style = document.createElement('style');
        style.id = 'notif-style';
        style.textContent = `
            @keyframes fadeInOut {
                0%   { opacity:0; transform:translateX(-50%) translateY(10px); }
                15%  { opacity:1; transform:translateX(-50%) translateY(0); }
                75%  { opacity:1; }
                100% { opacity:0; transform:translateX(-50%) translateY(-10px); }
            }
            .liked { color:#1db954 !important; }
            .queue-item { display:flex; align-items:center; gap:12px; padding:10px 16px;
                          cursor:pointer; border-radius:4px; transition:background 0.2s; }
            .queue-item:hover { background:rgba(255,255,255,0.1); }
            .queue-panel.open { right:0 !important; }`;
        document.head.appendChild(style);
    }

    document.body.appendChild(notif);
    setTimeout(() => { if (notif.parentNode) notif.remove(); }, 2500);
}

// ============================================
// UTILITIES
// ============================================

function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatPlays(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000)    return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}