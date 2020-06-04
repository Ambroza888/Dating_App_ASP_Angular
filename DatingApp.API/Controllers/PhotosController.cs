using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
[Authorize]
[Route("api/users/{userId}/photos")]
[ApiController]

public class PhotosController : ControllerBase
{
    private readonly IDatingRepository _repo;
    private readonly IMapper _mapper;
    private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
    public PhotosController(IDatingRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
    {
        _cloudinaryConfig = cloudinaryConfig;
        _mapper = mapper;
        _repo = repo;
    }
}
}