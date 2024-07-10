const Helper = {
     truncateString(str, length) {
    if (str.length > length) {
        return str.substring(0, length) + '...';
    } else {
        return str;
    }
},
     renderStars(rating)  {
        const totalStars = 5;
        let stars = [];
        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="bx bxs-star text-primary" data-tooltip-id="product-rating-tooltip" data-tooltip-content={rating+ " out of 5"}></i>);
            }
            else if (i - 0.5 < rating && i+5 > rating) {
                stars.push(<i key={i} className="bx bxs-star-half text-primary" data-tooltip-id="product-rating-tooltip" data-tooltip-content={rating + " out of 5"}></i>);
            }
            else {
                stars.push(<i key={i} className="bx bx-star" data-tooltip-id="product-rating-tooltip" data-tooltip-content={rating + " out of 5"}></i>);
            }
        }
        return stars;
    },
    can(permissionName){
            let userPermissions = this.getLoggedInUser()?.permissions ??['products'];
           let permissionExist =  userPermissions.includes(permissionName)
           if(permissionExist)
              return true;
           else
              return false;
    },
    getLoggedInUser(){
         let user = JSON.parse(localStorage.getItem('user'));
         return user;
    }
}
export default Helper