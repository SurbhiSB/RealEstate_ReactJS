export const createaddMembers = async (req, res, next) => {
  try {
    const { groupName, userShortName } = req.body;

    const existing = await addMembers.findOne({ groupName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Group name already exists',
      });
    }

    const newMember = new addMembers({ groupName, userShortName });
    await newMember.save();

    res.status(201).json({
      success: true,
      message: 'addMembers created successfully',
      data: newMember,
    });
  } catch (err) {
    next(err);
  }
};

export const getAlladdMemberss = async (req, res, next) => {
  try {
    const members = await members.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (err) {
    next(err);
  }
};
