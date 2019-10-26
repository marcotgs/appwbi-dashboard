import { Injectable } from '@angular/core';

export class Mail {
  constructor(
    public id: number,
    public sender: string,
    public senderMail: string,
    public subject: string,
    public date: string,
    public body: string,
    public attachment: boolean,
    public attachments: string[],
    public unread: boolean,
    public sent: boolean,
    public starred: boolean,
    public draft: boolean,
    public trash: boolean,
    public selected: boolean
  ) {}
}

const Mails = [
  new Mail(
    1,
    'Seth Wright',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    '6:08 PM',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    true,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    2,
    'Leo Jons',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    '12:55 PM',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    true,
    ['assets/images/product/chair.png', 'assets/images/product/chair2.png'],
    true,
    false,
    true,
    false,
    false,
    false
  ),
  new Mail(
    3,
    'Aron Shaur',
    'info@wrappixel.com',
    'consectetuer adipiscing elit.',
    '01.11.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    4,
    'Emily Rhodes',
    'info@wrappixel.com',
    'Aenean commodo ligula eget dolor. Aenean massa.',
    '21.07.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    true,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    5,
    'Draft',
    '',
    'no subject',
    '2:14 PM',
    '',
    false,
    [],
    false,
    false,
    false,
    true,
    false,
    false
  ),
  new Mail(
    6,
    'Draft',
    '',
    'Please confirm your account for furthur process',
    'Jan 7',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum interdum ex, sed aliquet nisl maximus imperdiet. ',
    false,
    [],
    false,
    false,
    false,
    true,
    false,
    false
  ),
  new Mail(
    7,
    'Kendra',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    '27.05.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    8,
    'Jimmy Fallon',
    'info@wrappixel.com',
    'consectetuer adipiscing elit.',
    '14.05.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    true,
    false,
    false,
    false
  ),
  new Mail(
    9,
    'Sam Tighe',
    'info@wrappixel.com',
    'Aenean commodo ligula eget dolor. Aenean massa.',
    '03.05.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    10,
    'Saul',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
    '30.04.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    true,
    false,
    false,
    false,
    false
  ),
  new Mail(
    11,
    'Nathan James',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    '24.04.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    12,
    'Mia Green',
    'info@wrappixel.com',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    '11.04.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    13,
    'Mario Gomez',
    'info@wrappixel.com',
    'Download the freebies from the site wrappixel.com all the admin template for free',
    '24.02.2018',
    '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  )
];

const mailsPromise = Promise.resolve(Mails);

@Injectable()
export class MailService {
  public getInboxMails() {
    return mailsPromise.then(mails =>
      mails.filter(
        mail =>
          mail.sent === false && mail.draft === false && mail.trash === false
      )
    );
  }

  public getStarredMails() {
    return mailsPromise.then(mails =>
      mails.filter(mail => mail.starred === true)
    );
  }

  public getSentMails() {
    return mailsPromise.then(mails => mails.filter(mail => mail.sent === true));
  }

  public getDraftMails() {
    return mailsPromise.then(mails =>
      mails.filter(mail => mail.draft === true)
    );
  }

  public getTrashMails() {
    return mailsPromise.then(mails =>
      mails.filter(mail => mail.trash === true)
    );
  }

  public getMail(id: number | string) {
    return mailsPromise.then(mails => mails.find(mail => mail.id === +id));
  }
}
