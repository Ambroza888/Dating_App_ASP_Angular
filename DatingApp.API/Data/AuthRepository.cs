using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Username == username);
            
            if(user == null)
                return null;
                
            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i =0 ; i < ComputeHash.Length; i++)
                {
                    if(ComputeHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

    public async Task<User> Register(User user, string password)
        {
            // Create 2 bytes[] with passwordHASH and passwordSALT
            // then we send those bytes[] in the method CREATEPASSWORDHASH
            // We use "out" keyword so we can send them as empty and they have been referenced
            byte[] passwordHash;
            byte[] passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        //Created CreatePasswordHash method from the register(keeping the rull of tumb to seperate functions);
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(u => u.Username == username))
                return true;
                
            return false;
        }
    }
}