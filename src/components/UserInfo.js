export default class UserInfo {
  constructor({userName, userAbout, userAvatar}) {
    this.userName = document.querySelector(userName);
    this.userAbout = document.querySelector(userAbout);
    this.userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    this.userInfo = {
      name: this.userName.textContent,
      about: this.userAbout.textContent,
    }
    return this.userInfo;
  }

  setUserAva(link) {
    this.userAvatar.src = link;
  }

  setUserInfo(name, about) {
    this.userName.textContent = name;
    this.userAbout.textContent = about;
  }
}