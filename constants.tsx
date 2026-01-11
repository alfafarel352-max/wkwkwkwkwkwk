
import { Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: '1. Dasar-Dasar Luau',
    difficulty: 'Beginner',
    description: 'Pengenalan sintaksis dasar dan cara kerja script di Roblox.',
    content: `Luau adalah bahasa pemrograman yang digunakan di Roblox. Sangat ringan dan cepat.

-- Tanda dua strip adalah komentar (tidak dijalankan)
print("Selamat datang di AllLabz!") -- Menampilkan teks di Output

Variabel (Wadah Penyimpan Data):
local nama = "Roblox Player" -- Tipe String (Teks)
local angka = 100 -- Tipe Number (Angka)
local benar = true -- Tipe Boolean (Benar/Salah)

Aturan Utama:
1. Gunakan 'local' untuk membuat variabel baru.
2. Penulisan nama variabel peka terhadap huruf besar/kecil (Case Sensitive).`
  },
  {
    id: '2',
    title: '2. Logika IF & Perbandingan',
    difficulty: 'Beginner',
    description: 'Membuat script yang bisa mengambil keputusan.',
    content: `Logika IF digunakan untuk mengecek kondisi tertentu.

local darah = 50

if darah > 80 then
    print("Sehat walafiat")
elseif darah > 20 then
    print("Waspada!")
else
    print("Hampir Mati")
end

Operator Perbandingan:
== (Sama dengan)
~= (Tidak sama dengan)
> (Lebih besar)
< (Lebih kecil)
>= (Lebih besar atau sama dengan)`
  },
  {
    id: '3',
    title: '3. Perulangan (Loops)',
    difficulty: 'Beginner',
    description: 'Menjalankan kode berulang kali secara otomatis.',
    content: `Ada dua perulangan utama di Roblox:

1. For Loop (Jumlah perulangan sudah pasti):
for i = 1, 10 do
    print("Angka ke: " .. i)
    task.wait(0.5) -- Menunggu 0.5 detik
end

2. While Loop (Berulang selama kondisi benar):
local hitung = 0
while hitung < 5 do
    hitung = hitung + 1
    print("Running...")
    task.wait(1)
end

PENTING: Selalu tambahkan task.wait() di dalam while loop agar game tidak lag/crash!`
  },
  {
    id: '4',
    title: '4. Fungsi (Functions)',
    difficulty: 'Intermediate',
    description: 'Membungkus kode agar bisa digunakan berulang kali.',
    content: `Fungsi membantu kita merapikan kode.

local function tambahkan(a, b)
    local hasil = a + b
    return hasil
end

local total = tambahkan(10, 20)
print(total) -- Output: 30

Fungsi Anonim (Sering digunakan di Event):
game.Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " baru saja bergabung!")
end)`
  },
  {
    id: '5',
    title: '5. Hubungan Client & Server',
    difficulty: 'Intermediate',
    description: 'Memahami FilteringEnabled dan RemoteEvents.',
    content: `Di Roblox, ada pemisahan antara CLIENT (Pemain) dan SERVER (Pusat Data).

1. LocalScript: Berjalan di HP/Laptop pemain. Hanya pemain itu yang bisa melihat perubahannya.
2. Script (Server): Berjalan di server Roblox. Semua pemain bisa melihat perubahannya.

Cara Komunikasi (RemoteEvents):
Client -> Server (FireServer)
Server -> Client (FireClient)

Contoh: Tombol GUI (Client) memicu pedang untuk menyerang (Server).`
  },
  {
    id: '6',
    title: '6. ModuleScripts',
    difficulty: 'Intermediate',
    description: 'Mengorganisir kode besar menjadi bagian-bagian kecil.',
    content: `ModuleScript adalah script yang bisa dipanggil oleh script lain.

-- Di dalam ModuleScript:
local Senjata = {}
Senjata.Damage = 10
function Senjata.Serang()
    print("Menyerang!")
end
return Senjata

-- Di Script biasa:
local ModuleSenjata = require(path.to.module)
ModuleSenjata.Serang()`
  },
  {
    id: '7',
    title: '7. Advanced Raycasting',
    difficulty: 'Advanced',
    description: 'Mendeteksi objek dalam garis lurus (untuk senjata/sensor).',
    content: `Raycasting menembakkan "sinar" laser tak terlihat untuk mendeteksi apa yang disentuhnya.

local origin = script.Parent.Position
local direction = Vector3.new(0, -10, 0) -- Menembak ke bawah

local rayParams = RaycastParams.new()
rayParams.FilterType = Enum.RaycastFilterType.Exclude

local result = workspace:Raycast(origin, direction, rayParams)

if result then
    print("Menyentuh: " .. result.Instance.Name)
end`
  },
  {
    id: '8',
    title: '8. DataStore & Leaderboard',
    difficulty: 'Advanced',
    description: 'Menyimpan data pemain secara permanen.',
    content: `Gunakan DataStoreService untuk menyimpan koin, level, atau inventory pemain.

local DSS = game:GetService("DataStoreService")
local StatsStore = DSS:GetDataStore("PlayerStats_V1")

-- Menyimpan Data saat pemain keluar:
game.Players.PlayerRemoving:Connect(function(player)
    local success, err = pcall(function()
        StatsStore:SetAsync(player.UserId, player.leaderstats.Coins.Value)
    end)
end)`
  }
];
