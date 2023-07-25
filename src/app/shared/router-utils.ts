import { Router } from '@angular/router';

export async function reloadPage(router: Router) {
  const currentUrl = router.url;
  await router.navigateByUrl('', { skipLocationChange: true });
  return router.navigateByUrl(currentUrl);
}
